
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');
const { getBrowser, safeRun, TIMEOUT } = require('./browser');
const { downloadDir, waitForKeypress, getInput, blocks } = require('./environment');
puppeteer.use(StealthPlugin());

const URL = 'https://www.gentube.app/create-together/k17e0enegvgsec6fy4epj16zrx8d9w78?creating=1';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {

    const browser = await getBrowser();

    const matrix = require('./matrix.json');

    //const page = await browser.newPage();
    const pages = await browser.pages();
    const page = pages[pages.length - 1];

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

    // MAIN LOOP
    for (let i = 0; i < 100000; i++) {

        let promptText = await getInput('Enter prompt: ');

        promptText = promptText.replace(/\{([^}]+)\}/g, (match, key) => {
                const block = blocks.find(b => b[key] !== undefined);
                return block ? block[key] : match;
            });
        const success = await safeRun(promptText, async () => {

            const textareaSelector = 'textarea';

            await page.waitForSelector(textareaSelector, {
                visible: true,
                timeout: TIMEOUT
            });

            console.log(promptText);

            // Fill textarea
            await page.locator(textareaSelector).fill(promptText);
            await page.keyboard.press('Enter');// Wait for image generation

            await page.click('button[aria-label="Create"]');
            
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
        });

        await waitForKeypress();
                    // Clear button
            await page.waitForSelector(
                'button[aria-label="Clear"]',
                { visible: true, timeout: 15000 }
            );

            await page.click('button[aria-label="Clear"]');
    }

    console.log('\n[COMPLETE] All prompts processed.');

})().catch(error => {
    console.error('[FATAL]', error);
});
