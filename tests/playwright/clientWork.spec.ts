import { test, expect } from '@playwright/test';

test.describe('EPAM site navigation - Client Work', () => {
  test('Navigate to Services -> Explore Our Client Work and verify Client Work text is visible', async ({ page }) => {
    // Step 1: Navigate to EPAM home page
    await page.goto('https://www.epam.com/');
    await expect(page).toHaveURL(/epam.com/);

    // Step 2: Open Services from header
    await page.getByRole('link', { name: 'Services' }).click();
    await page.waitForLoadState('networkidle');

    // Step 3: Click Explore Our Client Work
    await page.getByRole('link', { name: 'Explore Our Client Work' }).click();
    await page.waitForLoadState('networkidle');

    // Verify Client Work text visible
    await expect(page.getByText('Client Work')).toBeVisible();
  });
});
