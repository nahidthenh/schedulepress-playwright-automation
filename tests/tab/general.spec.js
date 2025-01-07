const { test, expect } = require('@playwright/test');
test.use({ storageState: 'playwright/.auth/user.json' });
test.describe("SchedulePress General Tab All TestCases", () => {
  test.beforeEach(async ({ page }) => {
    const cookies = await page.context().cookies();
    await page.goto('https://schedulepress.qa1.site/wp-admin/admin.php?page=schedulepress');
  });

  test('Verify Login', async ({ page }) => {
    await expect(page.getByRole('img', { name: 'mainLogo' })).toBeVisible();
    await expect(page.getByText('Core Version:')).toBeVisible();
    await expect(page.getByText('Pro Version:')).toBeVisible();
  });
});