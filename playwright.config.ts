import { PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  retries: 2,
  globalSetup: require.resolve('./global-setup'),
  use: {
    storageState: 'storageState.json',
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
      use: { ...devices['Pixel 4'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['iPhone 11'] },
    },
  ],
};

export default config;