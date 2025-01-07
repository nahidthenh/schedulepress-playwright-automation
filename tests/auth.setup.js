import { test as setup, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

const username = process.env.username;
const password = process.env.password;

setup('authenticate', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto('https://schedulepress.qa1.site/wp-login.php');
    await page.getByLabel('Username or Email Address').fill(username);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.waitForURL('https://schedulepress.qa1.site/wp-admin/');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    // End of authentication steps.
    await page.context().storageState({ path: authFile });
});