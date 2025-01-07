import { defineConfig, devices } from '@playwright/test';

import * as dotenv from 'dotenv';

dotenv.config();

const isCI = !!process.env.CI; // Check if the CI environment variable is set

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 1,
  workers: isCI ? 4 : undefined,
  reporter: [
    ['html'], // Ensure you have the HTML reporter as well
    ['dot'], // Console output reporter
  ],
  outputDir: 'test-results',
  use: {
    // baseURL: '',
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    // Setup project
    { name: 'setup', testMatch: /.*\.setup\.js/ },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      },
      dependencies: ['setup'],
    }
  ]
});

