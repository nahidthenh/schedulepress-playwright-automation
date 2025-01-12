const { test, expect } = require('@playwright/test');

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe("SchedulePress Email Notify Tab All TestCases ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://schedulepress.qa1.site/wp-admin/admin.php?page=schedulepress');
  });



  test('Email Notify Visibility Test', async ({ page }) => {
    await page.locator('span').filter({ hasText: 'Email Notify' }).click();
    await expect(page.getByRole('heading', { name: 'Email Notify' })).toBeVisible();
    await expect(page.getByText('To configure Email Notify')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Doc', exact: true })).toBeVisible();
    await expect(page.locator('#email_notify_under_review_section')).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Notify Author when a post is "Rejected"$/ }).first()).toBeVisible();
    await expect(page.locator('#notify_author_post_is_scheduled_section')).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Notify Author when a Scheduled Post is "Published"$/ }).first()).toBeVisible();
    await page.locator('div').filter({ hasText: /^Notify Author when a post is "Published"$/ }).first().click();
  });

  test('Email Notify Under Review Functionility Test', async ({ page }) => {
    await page.locator('span').filter({ hasText: 'Email Notify' }).click();
    await page.locator('#email_notify_under_review_section label').nth(1).click();
    await page.locator('div:nth-child(2) > .wprf-checkbox-select-wrap > .d-inline-block > .checkbox-select > .checkbox-select__control > .checkbox-select__value-container').click();
    await page.getByRole('option', { name: 'All' }).locator('span').click();
    await page.keyboard.press('Escape');
    await page.locator('div:nth-child(3) > .wprf-checkbox-select-wrap > .d-inline-block > .checkbox-select > .checkbox-select__control > .checkbox-select__value-container > .checkbox-select__input-container').click();
    await page.keyboard.press('Escape');
    await page.locator('#email_notify_under_review_section > .wprf-section-fields > div:nth-child(4) > .wprf-checkbox-select-wrap > .d-inline-block > .checkbox-select > .checkbox-select__control > .checkbox-select__value-container > .checkbox-select__input-container').click();
    await page.locator('#email_notify_under_review_section label').nth(1).click();
  });

  test('Notify User when a post is Scheduled Save Functionility Check', async ({ page }) => {
    await page.locator('span').filter({ hasText: 'Email Notify' }).click();
    await page.locator('#notify_author_post_is_scheduled_section label').nth(1).click();
    await expect(page.getByText('Role: Editor Select...')).toBeVisible();
    await expect(page.getByText('Username: rasel Select...')).toBeVisible();
    await expect(page.getByText('Email: rasel@wpdeveloper.com Select...')).toBeVisible();
    await page.locator('#notify_author_post_is_scheduled_section label').nth(1).click();
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await expect(page.getByLabel('Changes Saved Successfully')).toBeVisible();
  });
});