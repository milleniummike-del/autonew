
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');
const { getBrowser, safeRun, TIMEOUT } = require('./browser');
const { downloadDir, filepath, waitForKeypress, waitTime, blocks, getInput } = require('./environment');
puppeteer.use(StealthPlugin());
const useExisting = true;

const URL = 'https://www.gentube.app/create';

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
        await page.goto(URL, {
            waitUntil: 'networkidle2',
            timeout: 60000
        });

        let promptText = await getInput('Enter prompt: ');

        const assetNames = [...new Set(
            [...promptText.matchAll(/\[([^\]]+)\]/g)].map(match => match[1])
        )];

        promptText = promptText.replace(/\{([^}]+)\}/g, (match, key) => {
            const block = blocks.find(b => b[key] !== undefined);
            return block ? block[key] : match;
        });

        promptText = promptText.replace(/\[[^\]]*\]/g, '');

        if (useExisting && assetNames.length!=0) {
            console.log("Assets found " + assetNames.length)
            for (let count = 0; count < assetNames.length; count++) {
                const assetName = assetNames[count];
                await page.click('button[aria-label="Add an image — Max 10 MB"]');
                await page.waitForFunction(() => {
                    return document.querySelector('input[type="file"]');
                });

                const fileInput = await page.$('input[type="file"]');
                await fileInput.uploadFile(filepath + "\\" + assetName);

                console.log("Uploaded:", filepath + "\\" + assetName);
            }
            try {
                await page.click('button[aria-label="Close"]');
            } catch(e) {

            }
        }

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
            await waitTime();
            await page.click('button[aria-label="Create"]');
            await waitTime();
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

                //await saveDataImage(largest.src);
            }
        });

        await waitForKeypress();
    }

    console.log('\n[COMPLETE] All prompts processed.');

})().catch(error => {
    console.error('[FATAL]', error);
});
