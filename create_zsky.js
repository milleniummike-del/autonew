const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');
const { getBrowser } = require('./browser');
const { filepath } = require('./environment');

puppeteer.use(StealthPlugin());

// Wait for any key to be pressed in the terminal
function waitForKeypress() {
    return new Promise(resolve => {
        console.log('\nPress any key to continue..');

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
    for (let i = 1; i < 10; i++) {
        try {
            await page.goto(
                'https://zsky.ai/create',
                { waitUntil: "networkidle2", timeout: 0 }
            );

            console.log(i);
            const genStatusPoller = setInterval(async () => {
                try {
                    const status = await page.evaluate(() => {
                        const el = document.querySelector('#genStatus');

                        return el ? el.innerText.trim() : null;
                    });

                    if (status !== lastGenStatus) {
                        lastGenStatus = status;

                        if (status) {
                            console.log('[GEN STATUS]', new Date().toLocaleTimeString(), status);
                        } else {
                            console.log('[GEN STATUS] Element cleared or removed');
                        }
                    }

                } catch (error) {
                    console.log('[GEN STATUS ERROR]', error.message);
                }
            }, 1000);

            const prompt = 'the character in the image sings lip sync to the audio - perfect lip movements matching the audio';

            await page.waitForSelector('button.mode-toggle-btn[data-mode="video"]', {
                visible: true
            });

            await page.click('button.mode-toggle-btn[data-mode="video"]');
            await page.waitForSelector('#promptInput', { visible: true });
            await page.locator('#promptInput').fill(prompt);

            const imgExt = ".jpg";

            const audioPath = filepath + i + ".wav";
            const imagePath = filepath + i + imgExt;


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

            await new Promise(resolve => setTimeout(resolve, 2000));
            await page.click('button.prompt-generate');

            // <h1 class="render-state-title" id="renderStateTitle">Your video is rendering</h1>

            let lastGenStatus = null;



            try {
                await page.waitForFunction(() => {
                    const el = document.querySelector('#renderStateTitle');

                    if (!el) return false;

                    const text = el.innerText
                        .replace(/\s+/g, ' ')
                        .trim()
                        .toLowerCase();

                    return text.includes('your video is rendering');
                }, {
                    timeout: 120000,
                    polling: 500
                });

                console.log('[SUCCESS] Your video is rendering');

            } catch (error) {
                const details = await page.evaluate(() => {
                    const el = document.querySelector('#renderStateTitle');

                    return {
                        exists: !!el,
                        textContent: el?.textContent,
                        innerText: el?.innerText,
                        html: el?.outerHTML
                    };
                });

                console.log('[TIMEOUT] Render heading not matched');
                console.log('[DEBUG]', details);
            }

            try {
                await page.waitForSelector(
                    'video[crossorigin="anonymous"][src*="/api/media/generations/"]',
                    {
                        timeout: 240000
                    }
                );

                console.log('[SUCCESS] Video with crossorigin="anonymous" detected');

            } catch (error) {
                console.log('[TIMEOUT] Video element not detected');
            }

            //await waitForKeypress();

            // <div id="genStatus" class="gen-status blocked" role="alert">The finished render didn't pass our content review, so it wasn't delivered. Please adjust your prompt or source image and try again.</div>



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

            console.log('Invoke-WebRequest -Uri "' + videoSrc + '" -OutFile "' + filepath + '\\' + i + '.mp4"');
            const { execFile } = require('child_process');
            const path = require('path');

            const outputFile = path.join(filepath, `${i}.mp4`);

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

                const { filepath } = require('./environment');
                const { execFile } = require('child_process');
                const path = require('path');

                const workingDirectory1 = filepath + "\\" + i + ".mp4";
                const scriptPath1 = path.join(__dirname, 'ps_cutvideo_file.ps1');

                execFile('powershell.exe', [
                    '-NoProfile',
                    '-ExecutionPolicy', 'Bypass',
                    '-File', scriptPath1,
                    workingDirectory1
                ], (error, stdout, stderr) => {

                    if (stdout) console.log(stdout);
                    if (stderr) console.error(stderr);

                    if (error) {
                        console.error('PowerShell error:', error.message);
                        return;
                    }

                    console.log('Video processing completed.');
                });
            });
        } catch (e) {
            console.log(e);
        }
    }
    console.log("Finished queue");
})();