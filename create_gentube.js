
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');
const { getBrowser, safeRun, TIMEOUT } = require('./browser');
const {downloadDir} = require('./environment');
puppeteer.use(StealthPlugin());

const URL = 'https://www.gentube.app/create-together/k17e0enegvgsec6fy4epj16zrx8d9w78?creating=1';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Wait for any key to be pressed in the terminal
function waitForKeypress() {
    return new Promise(resolve => {
        console.log('\nWebsite loaded. Press any key to start...');

        if (process.stdin.isTTY) {
            process.stdin.setRawMode(true);
        }

        process.stdin.resume();

        process.stdin.once('data', () => {
            if (process.stdin.isTTY) {
                process.stdin.setRawMode(false);
            }

            process.stdin.pause();
            resolve();
        });
    });
}

(async () => {

    const browser = await getBrowser();

    const matrix = require('./matrix.json');

    const page = await browser.newPage();

    page.setDefaultTimeout(TIMEOUT);
    page.setDefaultNavigationTimeout(TIMEOUT);

    if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir, { recursive: true });
    }

    // Save DATA URI image ONLY
    async function saveDataImage(src) {

        const match = src.match(/^data:(image\/[\w.+-]+);base64,(.*)$/);

        if (!match) return;

        const ext = match[1].split('/')[1].split('+')[0];
        const base64 = match[2];

        const buffer = Buffer.from(base64, 'base64');

        const filename = `dataimg_${Date.now()}.${ext}`;
        const filepath = path.join(downloadDir, filename);

        fs.writeFileSync(filepath, buffer);

        console.log('[DATA] Saved:', filepath);
    }

    // Navigate
    console.log('[NAVIGATION] Opening Gentube...');

    const navigated = await safeRun('Open Gentube', async () => {

        await page.goto(URL, {
            waitUntil: 'domcontentloaded',
            timeout: TIMEOUT
        });

        return true;
    });

    if (!navigated) {
        console.error('[ERROR] Navigation failed.');
        console.log('Browser left open for inspection.');
        return;
    }

    console.log('[NAVIGATION] URL:', page.url());

    // Allow the application to render
    await sleep(2000);

    // WAIT FOR KEY BEFORE STARTING
    await waitForKeypress();

    console.log('Total prompts:', matrix.shots.length);

    // MAIN LOOP
    for (let i = 0; i < matrix.shots.length; i++) {

        console.log(`\nProcessing prompt ${i + 1}/${matrix.shots.length}`);

        const success = await safeRun(`Prompt ${i + 1}`, async () => {

            const textareaSelector = 'textarea';

            await page.waitForSelector(textareaSelector, {
                visible: true,
                timeout: TIMEOUT
            });

            const text = JSON.stringify(
                matrix.shots[i].in_frame_still_prompt
            );

            console.log(text);

            // Fill textarea
            await page.locator(textareaSelector).fill(text);
            await page.keyboard.press('Enter');// Wait for image generation
            await sleep(10000);

            // Capture largest data:image
            const dataImages = await page.evaluate(() => {

                return Array.from(document.querySelectorAll('img'))
                    .map(img => ({
                        src: img.src,
                        size: img.src.startsWith('data:image')
                            ? img.src.length
                            : 0
                    }))
                    .filter(obj => obj.size > 0);

            });

            if (dataImages.length === 0) {

                console.log('[DATA] No data images found for prompt', i + 1);

            } else {

                const largest = dataImages.reduce((a, b) =>
                    b.size > a.size ? b : a
                );

                await saveDataImage(largest.src);
            }

            // Clear button
            await page.waitForSelector(
                'button[aria-label="Clear"]',
                { visible: true, timeout: 15000 }
            );

            await page.click('button[aria-label="Clear"]');

            return true;
        });

        if (!success) {
            console.error(`[SKIPPED] Prompt ${i + 1} failed. Moving to next.`);
        }

        await sleep(2000);
    }

    console.log('\n[COMPLETE] All prompts processed.');

    // Close pages
    const pages = await browser.pages();

    for (const p of pages) {
        await p.close().catch(() => {});
    }

    await browser.close();

})().catch(error => {
    console.error('[FATAL]', error);
});
