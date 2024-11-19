import { expect, test, type Page } from '@playwright/test';

async function setBetAmount(page: Page, amount: string) {
  const betAmountInput = page.getByLabel('Bet Amount');
  await betAmountInput.clear();
  await betAmountInput.fill(amount);
  await betAmountInput.blur();
}

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

  test('can handle improper local storage value', async ({ page, context }) => {
    await context.addInitScript(() => {
      window.localStorage.setItem('plinko_balance', 'foo_bar');
    });

    await page.goto('/');

    await expect(page.getByText('200.00')).toBeVisible();
  });
});

test.describe('Manual Betting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('can adjust bet amount', async ({ page }) => {
    const betAmountInput = page.getByLabel('Bet Amount');
    const dropBallButton = page.getByRole('button', { name: 'Drop Ball' });

    // Multipliers
    await setBetAmount(page, '100');
    await page.getByRole('button', { name: '1/2' }).click();
    await expect(betAmountInput).toHaveValue('50');
    await page.getByRole('button', { name: '2×' }).click();
    await expect(betAmountInput).toHaveValue('100');

    // Reset to $0 if empty
    await setBetAmount(page, '');
    await expect(betAmountInput).toHaveValue('0');

    // Handle bet exceed balance
    await setBetAmount(page, '99999');
    await expect(dropBallButton).toBeDisabled();

    // Handle negative bet value
    await setBetAmount(page, '-10');
    await expect(dropBallButton).toBeDisabled();
  });

  test('can drop a ball', async ({ page }) => {
    const dropBallButton = page.getByRole('button', { name: 'Drop Ball' });

    // Drop ball deducts from balance
    await setBetAmount(page, '10');
    await dropBallButton.click();
    await expect(page.getByText('190.00')).toBeVisible();

    // Disable inputs while ball is dropping
    await expect(page.getByLabel('Risk')).toBeDisabled();
    await expect(page.getByLabel('Rows')).toBeDisabled();

    // Can drop another ball after the first one
    await dropBallButton.click();
    await expect(page.getByText('180.00')).toBeVisible();
  });
});

test.describe('Auto Betting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('can start and stop autobet', async ({ page }) => {
    await page.getByRole('button', { name: 'Auto' }).click();

    // New input appear
    const numberOfBetsInput = page.getByLabel('Number of Bets');
    await expect(numberOfBetsInput).toBeVisible();
    await expect(numberOfBetsInput).toHaveValue('0');

    // Start autobet
    await page.getByRole('button', { name: 'Start Autobet' }).click();
    await expect(page.getByRole('button', { name: 'Stop Autobet' })).toBeVisible();

    // During autobet, all inputs are disabled
    ['Bet Amount', 'Risk', 'Rows', 'Number of Bets'].forEach(async (label) => {
      await expect(page.getByLabel(label)).toBeDisabled();
    });
    await expect(page.getByRole('button', { name: 'Manual' })).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Auto', exact: true })).toBeDisabled();

    // Balance gets deducted automatically
    await page.waitForTimeout(1000);
    await expect(page.getByText(/19\d\.00/)).toBeVisible();

    // Stop autobet manually
    await page.getByRole('button', { name: 'Stop Autobet' }).click();
    await expect(page.getByLabel('Bet Amount')).toBeEnabled();
    await expect(page.getByLabel('Number of Bets')).toBeEnabled();
    await expect(page.getByRole('button', { name: 'Manual' })).toBeEnabled();
    await expect(page.getByRole('button', { name: 'Auto', exact: true })).toBeEnabled();
    await expect(page.getByLabel('Risk')).toBeDisabled(); // Disabled since there are still balls dropping
    await expect(page.getByLabel('Rows')).toBeDisabled();
  });
});
