import { test, expect } from '@playwright/test';

test('Homepage has Equines in title and get started link linking to the intro page', async ({ page }) => {
  await page.goto('http://localhost:3000/admin')
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Equine Training Tracker");
  // create a locator
  const equines = page.getByText('Equines');
  // Click the get started link.
  await equines.click();
  // Expects the URL to contain intro.
  await expect(page).toHaveURL('http://localhost:3000/admin/equines');
});