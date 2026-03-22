import { expect, test } from '@playwright/test';

test('shows the login entry points', async ({ page }) => {
  const requestedUrls: string[] = [];

  page.on('request', (request) => {
    requestedUrls.push(request.url());
  });

  await page.goto('/login');

  await expect.poll(() => requestedUrls.some((url) => url.includes('/api/v1/profile'))).toBe(true);
  await expect(page).toHaveURL(/\/login$/);

  await expect(page.getByRole('heading', { name: /필리에\s*오신것을 환영합니다/ })).toBeVisible();
  await expect(page.getByRole('button', { name: '카카오로그인' })).toBeVisible();
});
