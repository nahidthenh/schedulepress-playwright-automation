const { test: setup, expect } = require('@playwright/test');
const path = require('path');

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

const username = `${process.env.USERNAME}`;
const password = `${process.env.PASSWORD}`;

setup('authenticate', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto('https://schedulepress.wpqa.site/wp-login.php');
    await page.getByLabel('Username or Email Address').fill(username);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.waitForURL('https://schedulepress.wpqa.site/wp-admin/');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    // End of authentication steps.
    await page.context().storageState({ path: authFile });
});