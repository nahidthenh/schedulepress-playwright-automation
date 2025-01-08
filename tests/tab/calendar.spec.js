const { test, expect } = require('@playwright/test');

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe("SchedulePress General Tab All TestCases ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://schedulepress.qa1.site/wp-admin/admin.php?page=schedulepress');
    await page.locator('#wpsp-dashboard-body').getByText('Calendar', { exact: true }).click();
  });

  test('Calendar Settings Option Visibility Test', async ({ page }) => {
    await expect(page.locator('div').filter({ hasText: /^Select Post Type$/ }).nth(1)).toBeVisible();
    await expect(page.locator('#calendar_section').getByText('All').first()).toBeVisible();
    await expect(page.locator('.left > .checkbox-select > .checkbox-select__control > .checkbox-select__value-container')).toBeVisible();
    await expect(page.getByText('January').first()).toBeVisible();
    await page.locator('div').filter({ hasText: /^Select CategoryJanuary 2025Today$/ }).locator('span').nth(3).click();
    await page.getByRole('img').nth(2).click();
    await expect(page.getByRole('button', { name: '' }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: '' }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Today' })).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Today$/ }).locator('i').nth(2)).toBeVisible();
    await expect(page.getByPlaceholder('Search')).toBeVisible();
    await expect(page.getByText('SunMonTueWedThuFriSat29Add')).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Sunday' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Monday' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Tuesday' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Wednesday' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Thursday' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Friday' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Saturday' }).locator('div')).toBeVisible();
    await expect(page.getByText('10Add New')).toBeVisible();
  });

  test('Calendar Settings RightSidebar Visibility Test', async ({ page }) => {
    await expect(page.locator('#wpsp-sidebar')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Unscheduled Posts' })).toBeVisible();
    await expect(page.locator('#external-events-listing div').filter({ hasText: 'Select Category' }).nth(2)).toBeVisible();
    await expect(page.locator('#external-events-listing').getByText('All')).toBeVisible();
    await expect(page.getByRole('link', { name: 'New Draft' })).toBeVisible();
    await expect(page.locator('div > .wpsp-event-card > .wpsp-event-card-content > .wpsp-icon').first()).toBeVisible(); //Soft Assertion
  });


  test('Calendar Settings All Functionility Test', async ({ page }) => {
    // Click and verify sidebar visibility toggle
    await page.locator('div').filter({ hasText: /^Today$/ }).locator('i').nth(2).click();
    await expect(page.locator('#wpsp-sidebar')).toBeHidden();
    await page.locator('div').filter({ hasText: /^Today$/ }).locator('i').nth(2).click();
    await expect(page.locator('#wpsp-sidebar')).toBeVisible();

    // Navigate to New Draft
    await page.getByRole('link', { name: 'New Draft' }).click();
    await expect(page.getByRole('heading', { name: 'Add New post' })).toBeVisible();
    await expect(page.getByText('Title', { exact: true })).toBeVisible();
    await expect(page.getByRole('dialog').getByRole('button', { name: '' })).toBeVisible();

    // Fill in Title and Content
    await page.getByPlaceholder('Title', { exact: true }).click();
    await page.getByPlaceholder('Title', { exact: true }).fill('Nahid Hasan Automation Test');
    await page.getByPlaceholder('Content').click();
    await page.getByPlaceholder('Content').fill('Nahid Hasan Automation Test Content');

    // Save the draft
    await page.getByRole('button', { name: 'Save' }).click();

    // Dynamically handle current time in the draft verification
    const now = new Date();
    const hours = now.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Ensure two digits
    const ampm = now.getHours() >= 12 ? 'pm' : 'am';
    const currentTime = `${hours}:${minutes} ${ampm}`;
    const dynamicText = new RegExp(`^${currentTime}Nahid Hasan Automation\\.\\.\\.postDraft$`);

    // Verify draft entry is visible
    await expect(page.locator('div').filter({ hasText: dynamicText }).nth(1)).toBeVisible();
    await page.locator('div:nth-child(2) > .wpsp-event-card > .wpsp-event-card-content > .wpsp-icon').click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByLabel('Are you sure?').locator('span').first()).toBeVisible();
    await expect(page.getByRole('button', { name: '' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Are you sure?' })).toBeVisible();
    await expect(page.getByText('Your post will be moved to')).toBeVisible();
    await page.getByRole('button', { name: 'Move to Trash' }).click();

  });


});