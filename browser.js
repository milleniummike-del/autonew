// & "C:\Program Files\Google\Chrome\Application\chrome.exe" ` --remote-debugging-port=9222 `    --user-data-dir="C:\Users\mike_\autonew\browser
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

let browser = null;

const TIMEOUT = 120000;

async function getBrowser() {

    if (browser && browser.connected) {
        return browser;
    }

    console.log('[BROWSER] Connecting to existing Chrome...');

    browser = await puppeteer.connect({
        browserURL: 'http://127.0.0.1:9222',
        defaultViewport: null
    });

    console.log('[BROWSER] Connected successfully');

    browser.on('disconnected', () => {
        console.log('[BROWSER] Disconnected');
        browser = null;
    });

    return browser;
}

async function getPage() {

    const b = await getBrowser();

    const page = await b.newPage();

    page.setDefaultTimeout(TIMEOUT);
    page.setDefaultNavigationTimeout(TIMEOUT);

    return page;
}

async function safeRun(description, operation) {

    try {
        return await operation();

    } catch (error) {

        console.error(`[FAILED] ${description}: ${error.message}`);

        if (error.name === 'TimeoutError') {
            console.error(`[TIMEOUT] ${description} - moving to next piece.`);
        }

        return null;
    }
}

module.exports = {
    getBrowser,
    getPage,
    safeRun,
    TIMEOUT
};
