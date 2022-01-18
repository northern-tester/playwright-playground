import test, { expect } from "@playwright/test";

const RANDOM = (Math.random() + 1).toString(36).substring(7);
const REPO = `playwright-playground-${RANDOM}`;
const USER = 'northern-tester';

test.beforeAll(async ({ request }) => {
    const response = await request.post('/user/repos', {
        data: {
            name: REPO
        }
    });
    expect(response.ok()).toBeTruthy();
})

test('should create a bug report', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: `[Bug] ${REPO} Report 1`,
            body: `Another bug raised by ${USER}`
        }
    });
    expect(newIssue.ok()).toBeTruthy();

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: `[Bug] ${REPO} Report 1`,
        body: `Another bug raised by ${USER}`
    }))
});

test('should create a feature request', async ({ request }) => {
    const newFeature = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: `[Feature] ${REPO} Feature 1`,
            body: `Another feature raised by ${USER}`
        }
    });
    expect(newFeature.ok()).toBeTruthy();

    const features = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(features.ok()).toBeTruthy();
    expect(await features.json()).toContainEqual(expect.objectContaining({
        title: `[Feature] ${REPO} Feature 1`,
        body: `Another feature raised by ${USER}`
    }));
});

test.afterAll(async ({ request }) => {
    const response = await request.delete(`/repos/${USER}/${REPO}`);
    expect(response.ok()).toBeTruthy();
})