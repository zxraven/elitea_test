import { test, expect } from '@playwright/test';

test('EPAM: Services -> Explore Our Client Work -> Client Work visible', async ({ page }) => {
  await page.goto('https://www.epam.com/');

  // Best-effort cookie banner handling (varies by region/session).
  const acceptCookies = page.getByRole('button', { name: /accept/i });
  if (await acceptCookies.isVisible().catch(() => false)) {
    await acceptCookies.click();
  }

  // "Services" can be either a direct link or a menu button depending on viewport/AB tests.
  const services = page
    .getByRole('link', { name: /^Services$/ })
    .or(page.getByRole('button', { name: /^Services$/ }));

  await services.first().click();

  const exploreClientWork = page.getByRole('link', { name: /Explore Our Client Work/i });
  await exploreClientWork.click();

  await expect(page.getByText('Client Work')).toBeVisible();
});
