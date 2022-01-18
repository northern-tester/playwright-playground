import { PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
    forbidOnly: !!process.env.CI,
    retries: 2,
    use: {
        trace: 'on-first-retry',
        baseURL: 'https://api.github.com',
        extraHTTPHeaders: {
          // We set this header per GitHub guidelines.
          'Accept': 'application/vnd.github.v3+json',
          // Add authorization token to all requests.
          // Assuming personal access token available in the environment.
          'Authorization': `token ${process.env.API_TOKEN}`
        }
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
          },
          {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
          },
          {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
          },
    ],
};

export default config;