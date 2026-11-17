const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');
const { getBrowser, safeRun, TIMEOUT } = require('./browser');
const { downloadDir, filepath, waitForKeypress, waitTime, blocks, projectFile } = require('./environment');
puppeteer.use(StealthPlugin());

const URL = 'https://www.gentube.app/create';

(async () => {

    const browser = await getBrowser();
    const matrix = require('./' + projectFile);

    //const page = await browser.newPage();
    const pages = await browser.pages();
    const page = pages[pages.length - 1];

    page.setDefaultTimeout(TIMEOUT);
    page.setDefaultNavigationTimeout(TIMEOUT);

    if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir, { recursive: true });
    }

    // Save DATA URI image ONLY
    async function saveDataImage(src, filename) {

        const match = src.match(/^data:(image\/[\w.+-]+);base64,(.*)$/);

        if (!match) return;

        const ext = match[1].split('/')[1].split('+')[0];
        const base64 = match[2];

        const buffer = Buffer.from(base64, 'base64');

        if (!filename) {
            filename = `dataimg_${Date.now()}.${ext}`;
        }
        const filepath = path.join(downloadDir, filename);

        fs.writeFileSync(filepath, buffer);

        console.log('[DATA] Saved:', filepath);
    }

    async function render(promptText, assetTags = [], useExisting = false) {

        const textareaSelector = 'textarea';

        await page.waitForSelector(textareaSelector, {
            visible: true,
            timeout: TIMEOUT
        });

        promptText = promptText.replace(/\{([^}]+)\}/g, (match, key) => {
            const block = blocks.find(b => b[key] !== undefined);
            return block ? block[key] : match;
        });

        promptText = promptText.replace(/\[[^\]]*\]/g, '');

        if (useExisting && assetTags.length != 0) {
            console.log("Assets found " + assetTags.length)
            for (let count = 0; count < assetTags.length; count++) {
                const assetName = assetTags[count] + ".webp";
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
            } catch (e) {

            }
        }

        console.log(promptText);

        // Fill textarea
        await page.locator(textareaSelector).fill(promptText);
        await page.keyboard.press('Enter');// Wait for image generation
        await waitTime();
        await page.click('button[aria-label="Create"]');
    }


  for (count=0;count<matrix.length;count++){
        await page.goto(URL, {
            waitUntil: 'networkidle2',
            timeout: 60000
        });
        let useExisting = true;
        let text = matrix[count].description;
        let assetTags = ["Elsa Stenrick"];


        await render(text, assetTags, useExisting);
        await waitTime(3000);
    }

    console.log('\n[COMPLETE] All prompts processed.');

})().catch(error => {
    console.error('[FATAL]', error);
});