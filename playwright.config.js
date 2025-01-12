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
  reporter: process.env.CI
    ? [
      [
        "./node_modules/playwright-slack-report/dist/src/SlackReporter.js",
        {
          slackWebHookUrl: process.env.SLACK_WEBHOOK_URL,
          sendResults: "always", // "always" , "on-failure", "off"
          maxNumberOfFailuresToShow: 0,
          meta: [
            {
              key: ":wpsp: SchedulePress Automation - Test Results",
              value: "<https://nahidthenh.github.io/schedulepress-playwright-automation/ | 📂 See The Result.>",
            },
          ],
        },
      ],
      ["html"],
    ]
    : [["dot"], ["list"], ["html"]],
  timeout: 60000, // Increase default timeout to 60 seconds
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

