import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
});

test('Check page title', async ({ page }) => {
    //await page.goto('https://playwright.dev/');
    const title = page.locator('.navbar__inner .navbar__title');
    await expect(title).toHaveText('Playwright')
});

test('Various assertions', async ({ page }) => {
    //await page.goto('https://playwright.dev/');

    //Contains substring
    await expect(page).toHaveTitle(/Playwright/);

    //Attribute to be strictly equal
    await expect(page.locator('text=Get Started').first()).toHaveAttribute('href', '/docs/intro');

    //Element to be visible
    await expect(page.locator('text=API reference').first()).toBeVisible();

    await page.click('text=Get Started');
    await expect(page.locator('text=Introduction').first()).toBeVisible();
});