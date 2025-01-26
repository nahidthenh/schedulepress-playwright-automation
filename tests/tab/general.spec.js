const { test, expect } = require('@playwright/test');

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe("SchedulePress General Tab All TestCases ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://schedulepress.wpqa.site/wp-admin/admin.php?page=schedulepress');
    // await page.waitForLoadState('networkidle');
  });

  test('Verify logo & version', async ({ page }) => {
    await expect(page.getByRole('img', { name: 'mainLogo' })).toBeVisible();
    await expect(page.getByText('Core Version:')).toBeVisible();
    await expect(page.getByText('Pro Version:')).toBeVisible();
  });

  test('General Settings Option Visibility Test', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'General Settings' })).toBeVisible();
    await expect(page.getByText('Show Scheduled Posts in Dashboard Widget')).toBeVisible();
    await expect(page.getByText('Show Scheduled Posts in Sitewide Admin Bar')).toBeVisible();
    await expect(page.getByText('Show Scheduled Posts in Admin')).toBeVisible();
    await expect(page.getByText('Show Post Types:')).toBeVisible();
    await expect(page.locator('#general_settings').getByText('All').first()).toBeVisible();
    await expect(page.locator('.checkbox-select__value-container').first()).toBeVisible();
    await expect(page.locator('.checkbox-select__indicators > div:nth-child(3)').first()).toBeVisible();
    await page.locator('.checkbox-select__input-container').first().click();
    await expect(page.getByText('Allow Taxonomy as Tags:')).toBeVisible();
    await expect(page.getByText('Show Categories:')).toBeVisible();
    await expect(page.getByText('Allow users:')).toBeVisible();
    await expect(page.getByText('Calendar Default Schedule')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Custom item template for' })).toBeVisible();
    await expect(page.getByText('Show Publish Post Immediately')).toBeVisible();
    await expect(page.getByText('Show Scheduled Posts in Elementor')).toBeVisible();
    await expect(page.getByText('Post Republish and Unpublish')).toBeVisible();
    await expect(page.getByText('Active Republish Social Share')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Save Changes' })).toBeVisible();
  });

  test('General Settings RightSideBar Visibility Test For manage-license', async ({ page }) => {
    await expect(page.locator('.manage-license')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Manage License' })).toBeVisible();
    await expect(page.getByText('Supercharge your content')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Manage License' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'upgrade-pro-img' })).toBeVisible();
  });

  test('General Settings RightSideBar Visibility Test For Documentation', async ({ page }) => {
    await expect(page.locator('.card > .wpsp-icon').first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Documentation' })).toBeVisible();
    await expect(page.getByText('Get started spending some')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Documentation ' })).toBeVisible();
  });

  test('General Settings RightSideBar Visibility Test For Contribute To WPSP', async ({ page }) => {
    await expect(page.locator('.wpsp-admin-sidebar > div:nth-child(3) > .wpsp-icon')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Contribute to SchedulePress' })).toBeVisible();
    await expect(page.getByText('You can contribute to making')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Report A Bug ' })).toBeVisible();
  });

  test('General Settings RightSideBar Visibility Test For Need Help', async ({ page }) => {
    await expect(page.locator('div:nth-child(4) > .wpsp-icon')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Need Help?' })).toBeVisible();
    await expect(page.getByText('Stuck with something? Get')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Get Support ' })).toBeVisible();
  });

  test('General Settings RightSideBar Visibility Test For Show your Love', async ({ page }) => {
    await expect(page.locator('div:nth-child(5) > .wpsp-icon')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Show your Love' })).toBeVisible();
    await expect(page.getByText('We love to have you in the')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Show your Love ' })).toBeVisible();
  });

});