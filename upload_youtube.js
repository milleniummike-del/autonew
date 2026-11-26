/**
 * YouTube Upload Automation (STABLE + VERSION SAFE)
 */

const channels = [
    'https://studio.youtube.com/channel/UCwUI5e_vV229JZZcTLoIdgg',
    'https://studio.youtube.com/channel/UCotGGoP_MQUh6lgB1smxrfw',
    'https://studio.youtube.com/channel/UC5A2FeUQSnut7JqHRNGGmBA'
];

const channel = channels[2];

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const path = require('path');
const fs = require('fs');


const { getBrowser, safeRun, TIMEOUT } = require('./browser');
const { downloadDir, filepath, waitForKeypress, waitTime, blocks, projectFile } = require('./environment');

const directory = require('./directory.js');

const DEBUG = true;
const matrix = require('./' + projectFile);

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ---------------------------------------------------------
// CLI PARSER
// ---------------------------------------------------------
function getArg(name, fallback = '') {
    const arg = process.argv.find(a => a.startsWith(`--${name}=`));
    if (!arg) return fallback;
    return arg.split('=').slice(1).join('=');
}

// ---------------------------------------------------------
// FILE READER
// ---------------------------------------------------------
function readTextFile(filePath, fallback = '') {
    try {
        if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath, 'utf8').trim();
        }
    } catch (err) {
        console.warn(`⚠️ Failed to read ${filePath}:`, err.message);
    }
    return fallback;
}

const TITLE_FILE = path.join(__dirname, 'youtube_title.txt');
const DESC_FILE = path.join(__dirname, 'youtube_description.txt');

const CHANNEL = getArg('channel', channel);

puppeteer.use(StealthPlugin());

(async () => {
    const browser = await getBrowser();
    // IMPORTANT: page must be OUTSIDE try/catch
    const page = (await browser.pages())[0];


    for (day = 0; day < 7; day++) {
        try {

            await page.goto(channels[0], {
                waitUntil: 'networkidle2',
                timeout: 60000
            });

            console.log(matrix[day]);

            const FILE_PATH = getArg('file', filepath + 'day' + day + '.mp4');
            const TITLE = matrix[day].title;
            const DESCRIPTION = matrix[day].description;

            console.log("📂 File:", FILE_PATH);
            console.log("📝 Title:", TITLE);
            console.log("📄 Description:", DESCRIPTION);

            page.on('dialog', async dialog => {
                console.log("⚠️ Dialog:", dialog.message());
                try {
                    //await dialog.dismiss();
                    await dialog.accept();
                } catch (e) {
                    console.log(e);
                }
            });


            await page.waitForSelector("ytcp-icon-button#upload-icon", { timeout: 0 });

            console.log("✅ Upload button found");

            await page.click("ytcp-icon-button#upload-icon");

            const fileInput = await page.waitForSelector("input[type='file']");
            await fileInput.uploadFile(FILE_PATH);

            console.log("📤 Uploading... " + FILE_PATH);

            await page.waitForSelector("ytcp-video-title #textbox", { timeout: 60000 });

            const titleBox = await page.$("ytcp-video-title #textbox");

            await page.evaluate((el, text) => {
                el.focus();
                document.execCommand('selectAll', false, null);
                document.execCommand('delete', false, null);
                document.execCommand('insertText', false, text);
                el.dispatchEvent(new Event("input", { bubbles: true }));
            }, titleBox, TITLE);

            const descBox = await page.$("ytcp-video-description #textbox");

            await page.evaluate((el, text) => {
                el.focus();
                document.execCommand('selectAll', false, null);
                document.execCommand('delete', false, null);
                document.execCommand('insertText', false, text);
                el.dispatchEvent(new Event("input", { bubbles: true }));
            }, descBox, DESCRIPTION);

            console.log("✍️ Title + Description set");

            //await waitForKeypress();
            await waitTime(10000);
            console.log("➡️ Wizard steps...");
nextBtn = await page.$('ytcp-button#next-button');
await nextBtn.click();
await nextBtn.click();
await nextBtn.click();
const expandButton = page.locator('#second-container-expand-button');

await expandButton.wait();
await expandButton.click();

await page.waitForSelector('#datepicker-trigger', {
    visible: true,
    timeout: 10000
});

await page.click('#datepicker-trigger');
// Calculate tomorrow's date
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1 + day);

// Format: Nov 28, 2026
const dateText = tomorrow.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
});

const selector = 'input.tp-yt-paper-input[autofocus]';

// Wait for date input
await page.waitForSelector(selector, {
    visible: true,
    timeout: 10000
});

// Click input
await page.click(selector);

// Select all existing text
await page.keyboard.down('Control');
await page.keyboard.press('A');
await page.keyboard.up('Control');

// Delete existing text
await page.keyboard.press('Backspace');

// Type tomorrow's date
await page.type(selector, dateText, {
    delay: 50
});

// Confirm
await page.keyboard.press('Enter');

console.log('🔥 Date entered:', dateText);

// Wait for YouTube Studio update
await new Promise(resolve => setTimeout(resolve, 1000));
await page.waitForSelector('#done-button', {
    visible: true,
    timeout: 10000
});

await page.click('#done-button');
await page.waitForSelector('button[aria-label="Got it"]', {
    visible: true,
    timeout: 10000
});

await page.click('button[aria-label="Got it"]');

//await waitForKeypress();
            /*

            

            for (let i = 0; i < 1; i++) {
                await waitForKeypress();
                const nextBtn = await page.$('ytcp-button#next-button');

                if (!nextBtn) break;

                const disabled = await page.evaluate(btn =>
                    btn.hasAttribute('disabled') ||
                    btn.getAttribute('aria-disabled') === 'true',
                    nextBtn
                );

                if (disabled) {
                    console.log("⏳ Waiting for step (likely audience)...");

                    await sleep(2000);
                    continue;
                }

                await nextBtn.click();
                await sleep(2000);
            }

            console.log("👶 Setting audience...");

            await sleep(2000);

            const notForKids = await page.evaluateHandle(() => {
                const buttons = Array.from(
                    document.querySelectorAll('tp-yt-paper-radio-button')
                );

                return buttons.find(btn => {
                    const text = (btn.innerText || "").toLowerCase();

                    return (
                        text.includes("not made for kids") ||
                        text.includes("no, it's not made for kids")
                    );
                });
            });

            const exists = await page.evaluate(el => !!el, notForKids);

            if (exists) {
                const checked = await page.evaluate(el =>
                    el.getAttribute("aria-checked") === "true",
                    notForKids
                );

                if (!checked) {
                    console.log("🖱️ Clicking 'Not made for kids'...");
                    await page.evaluate(el => el.click(), notForKids);
                    await sleep(1500);
                } else {
                    console.log("ℹ️ Already set");
                }
            }

            console.log("➡️ Click next...");


            let nextBtn = await page.$('ytcp-button#next-button');

            await nextBtn.click();

            console.log("➡️ Click next...");


            nextBtn = await page.$('ytcp-button#next-button');

            await nextBtn.click();

            console.log("➡️ Click next...");
            console.log("💾 Saving...");

            let saved = false;

            for (let i = 0; i < 10; i++) {

                const saveBtn = await page.$('button[aria-label="Save"]');

                if (saveBtn) {
                    const disabled = await page.evaluate(btn =>
                        btn.getAttribute("aria-disabled") === "true",
                        saveBtn
                    );

                    if (!disabled) {
                        await saveBtn.click();
                        saved = true;
                        break;
                    }
                }

                await sleep(1500);
            }

            if (saved) {
                console.log("✅ Upload complete!");
                await sleep(5000);
            } else {
                console.log("❌ Save failed");
            }

            */

        } catch (e) {
            console.error("🔥 Error:", e);
        } finally {
            console.log("ended...")
        }
    }
})();