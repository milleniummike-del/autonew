
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');
const { getBrowser, safeRun, TIMEOUT } = require('./browser');
const { downloadDir, filepath, waitForKeypress, waitTime, blocks } = require('./environment');
puppeteer.use(StealthPlugin());

const URL = 'https://www.gentube.app/create';

(async () => {

    const browser = await getBrowser();

    const matrix = require('./project4.json');

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
    console.log('Total prompts:', matrix.sets.length);


    async function render(promptText, assetTags = [], useExisting = false) {

        const textareaSelector = 'textarea';

        await page.waitForSelector(textareaSelector, {
            visible: true,
            timeout: TIMEOUT
        });

        const assetNames = [...new Set(
            [...assetTags.matchAll(/\[([^\]]+)\]/g)].map(match => match[1])
        )];

        promptText = promptText.replace(/\{([^}]+)\}/g, (match, key) => {
            const block = blocks.find(b => b[key] !== undefined);
            return block ? block[key] : match;
        });

        promptText = promptText.replace(/\[[^\]]*\]/g, '');

        if (useExisting && assetNames.length != 0) {
            console.log("Assets found " + assetNames.length)
            for (let count = 0; count < assetNames.length; count++) {
                const assetName = assetNames[count] + ".webp";
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

    //const chosen = ["roles","shots"];
    //const chosen = ["props", "sets", "characters", "costumes"];
    //const chosen = ["costumes"];
    //const chosen = ["characters"];
    const chosen = ["sets","roles"];
    //const chosen = ["sets"];

    for (const section of chosen) {
        for (const item of matrix[section]) {
            await page.goto(URL, {
                waitUntil: 'networkidle2',
                timeout: 60000
            });
            let useExisting = false;
            let text = item.description;
            let assetTags = "";

            if (section === 'shots') {
                useExisting = true;
                text = text  + ' ' + matrix.visualTone.lightingPhilosophy + ' ' + matrix.visualTone.colorPalette;
                assetTags = item.assetTags;
            }
            if (section === 'sets') {
                text = text + ' photorealistic ' + matrix.visualTone.lightingPhilosophy + ' ' + matrix.visualTone.colorPalette;
            }
            if (section === 'props') {
                text = text + " studio portrait photo of object standing against a seamless white background, soft even lighting, neutral expression, full-length shot, clean symmetrical composition"
            }

            if (section === 'roles') {
                useExisting = true;
                assetTags = item.assetTags;
            }
            if (section === 'costumes') {
                text = text + " object placed on a plain white mannequin - Full-body studio portrait standing against a seamless white background, soft even lighting, neutral expression, full-length shot, clean symmetrical composition, high-fashion editorial photography style."
            }
            if (section === 'characters' || section == 'roles') {
                text = text + " photorealistic Full-body studio portrait standing against a seamless white background, soft even lighting, neutral expression, full-length shot, clean symmetrical composition, high-fashion editorial photography style."
            }

            await render(text, assetTags, useExisting);
            await waitTime(5000);

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

                console.log('[DATA] No data images found for prompt');

            } else {

                const largest = dataImages.reduce((a, b) =>
                    b.size > a.size ? b : a
                );

                await saveDataImage(largest.src, item.id + ".webp");
            }
        }
    }
    console.log('\n[COMPLETE] All prompts processed.');

})().catch(error => {
    console.error('[FATAL]', error);
});
