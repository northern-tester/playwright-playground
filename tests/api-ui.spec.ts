import { test, expect } from '@playwright/test';

const RANDOM = (Math.random() + 1).toString(36).substring(7);
const REPO = `playwright-playground-${RANDOM}`;
const USER = 'northern-tester';

let apiContext;

test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        // All requests we send go to this API endpoint.
        baseURL: 'https://api.github.com',
        extraHTTPHeaders: {
            // We set this header per GitHub guidelines.
            'Accept': 'application/vnd.github.v3+json',
            // Add authorization token to all requests.
            // Assuming personal access token available in the environment.
            'Authorization': `token ${process.env.API_TOKEN}`,
        },
    });
    const response = await apiContext.request.post('/user/repos', {
        data: {
            name: REPO
        }
    });
    expect(response.ok()).toBeTruthy();
})

test.afterAll(async ({ }) => {
    const response = await apiContext.request.delete(`/repos/${USER}/${REPO}`);
    expect(response.ok()).toBeTruthy();
    await apiContext.dispose();
})

test('last created issues should be first in the list', async ({ page }) => {
    for (let index = 0; index < 3; index++) {
        const newIssue = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
            data: {
                title: `[Feature] ${REPO} Feature ${index}`,
                body: `Another feature raised by ${USER}`
            }
        });
        expect(newIssue.ok()).toBeTruthy();
    }

    await page.goto(`https://github.com/${USER}/${REPO}/issues`);
    const firstIssue = page.locator(`a[data-hovercard-type='issue']`).first();
    await expect(firstIssue).toHaveText(`[Feature] ${REPO} Feature 2`)
})