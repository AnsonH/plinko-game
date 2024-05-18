import { test, expect } from '@playwright/test';

test.describe('Balance', () => {
  test('can add money', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByRole('button', { name: '+$1000' }).click();
    await expect(page.getByText('1,200.00')).toBeVisible();
  });

  test('can load balance from local storage', async ({ page, context }) => {
    await context.addInitScript(() => {
      window.localStorage.setItem('plinko_balance', '1234');
    });

    await page.goto('/');

    await expect(page.getByText('1,234.00')).toBeVisible();
  });
});
