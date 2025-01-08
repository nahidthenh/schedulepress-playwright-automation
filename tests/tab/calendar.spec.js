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
});