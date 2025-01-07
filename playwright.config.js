const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();
const isCI = !!process.env.CI; // Check if the CI environment variable is set

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 1,
  workers: isCI ? 1 : undefined,
  reporter: [
    ...(isCI
      ? [
        [
          './node_modules/playwright-slack-report/dist/src/SlackReporter.js',
          {
            slackWebHookUrl: process.env.SLACK_WEBHOOK_URL,
            sendResults: 'always',
            maxNumberOfFailuresToShow: 0,
            meta: [
              {
                key: ":wpsp: SchedulePress Automation - Test Results",
                value:
                  "<https://nahidthenh.github.io/schedulepress-playwright-automation/ | :desktop_computer: Check The Final Report!>",
              },
            ],
          },
        ],
      ]
      : []),
    ['html', { outputFolder: 'playwright-report', open: 'never' }], // Ensure you have the HTML reporter as well
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
        ...devices['Desktop Chrome'],
        dependencies: ['setup'],
      },
    }
  ]
});

