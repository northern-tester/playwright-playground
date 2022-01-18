import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  // Go to https://www.wikipedia.org/
  await page.goto('https://www.wikipedia.org/');

  // Click input[name="search"]
  await page.click('input[name="search"]');

  // Fill input[name="search"]
  await page.fill('input[name="search"]', 'badgers');

  // Click button:has-text("Search")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://en.wikipedia.org/wiki/Badger' }*/),
    page.click('button:has-text("Search")')
  ]);

});