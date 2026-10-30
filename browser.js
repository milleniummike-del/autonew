
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

let browser = null;

const TIMEOUT = 120000; // 2 minutes

async function getBrowser() {
    if (browser && browser.connected) {
        return browser;
    }

    browser = await puppeteer.launch({
        headless: false,
        executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
        defaultViewport: null,
        userDataDir: "../browser2",
        protocolTimeout: TIMEOUT,
        args: [
            "--disable-blink-features=AutomationControlled",
            "--no-sandbox",
            "--disable-setuid-sandbox"
        ]
    });

    browser.on('disconnected', () => {
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

// Run an operation without allowing a failure to stop the script
async function safeRun(description, operation) {
    try {
        return await operation();
    } catch (error) {
        const message = `[FAILED] ${description}: ${error.message}`;

        console.error(message);

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
