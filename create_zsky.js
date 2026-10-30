const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');
const { getBrowser } = require('./browser');

puppeteer.use(StealthPlugin());

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
    const page = await browser.newPage();

    // MAIN LOOP
    for (let i = 11; i < 12; i++) {
        try {
            await page.goto(
                'https://zsky.ai/create',
                { waitUntil: "networkidle2", timeout: 0 }
            );

            console.log(i);

            const prompt = 'the character in the image sings lip sync to the audio - perfect lip movements matching the audio';

            await page.waitForSelector('button.mode-toggle-btn[data-mode="video"]', {
                visible: true
            });

            await page.click('button.mode-toggle-btn[data-mode="video"]');
            await page.waitForSelector('#promptInput', { visible: true });
            await page.locator('#promptInput').fill(prompt);

            const inputmixed = "X:\\inputmixed\\Sing the Dark Away_split_pieces_36_parts\\";


            const audioPath = inputmixed + i + ".wav";
            const imagePath = inputmixed + i + ".jpeg";

            // CHECK BOTH FILES EXIST
            if (!fs.existsSync(audioPath)) {
                console.log(`Skipping part ${i}: Audio file missing: ${audioPath}`);
            }

            const fileInput = await page.waitForSelector('#imgAttachInput');
            await fileInput.uploadFile(imagePath);

            await page.waitForFunction(() => {
                const input = document.querySelector('#imgAttachInput');
                return input && input.files && input.files.length > 0;
            });

            console.log('Image uploaded successfully');

            const fileInput2 = await page.waitForSelector('#audioAttachInput');
            await fileInput2.uploadFile(audioPath);

            await page.waitForFunction(() => {
                const input = document.querySelector('#audioAttachInput');
                return input && input.files && input.files.length > 0;
            });

            console.log('Audio uploaded successfully');


            await page.waitForSelector('input[name="attachedAudioUse"][value="lip-sync"]', {
                visible: true
            });

            await page.click('input[name="attachedAudioUse"][value="lip-sync"]');
            await page.click('button.prompt-generate');

            await new Promise(resolve => setTimeout(resolve, 2000));

            const handle = await page.waitForFunction(
                () => {
                    const videos = [...document.querySelectorAll('video')]
                        .filter(v => (v.currentSrc || v.src).includes('api/media'));

                    return videos.length > 0
                        ? videos[videos.length - 1].currentSrc || videos[videos.length - 1].src
                        : false;
                },
                { timeout: 240000 }
            );

            const videoSrc = await handle.jsonValue();

            console.log('Invoke-WebRequest -Uri "' + videoSrc + '" -OutFile "' + inputmixed + '\\' + i + '.mp4"');
            const { execFile } = require('child_process');
            const path = require('path');

            const outputFile = path.join(inputmixed, `${i}.mp4`);

            execFile('curl.exe', [
                '-L',
                '--fail',
                '--silent',
                '--show-error',
                videoSrc,
                '-o',
                outputFile
            ], (error, stdout, stderr) => {
                if (error) {
                    console.error('Download failed:', stderr || error.message);
                    return;
                }

                console.log('Downloaded:', outputFile);
            });
        } catch (e) {
            console.log(e);
            waitForKeypress()
        }
    }

    const pages = await browser.pages();
    for (const p of pages) await p.close();

    await browser.close();
})();