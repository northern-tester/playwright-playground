import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://github.com/login');
    await page.fill('input[name="user"]', 'user');
    await page.fill('input[name="password"]', 'password');
    await page.click('text=Sign in');
    await page.context().storageState({ path: 'storageState.json'});
    await browser.close();

}

export default globalSetup;