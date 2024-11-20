import { test, expect } from "@playwright/test";
test("Open page and verify title", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page).toHaveTitle("DynamincFromGenerator");
});
test("Open and check Heading is Visible are not", async ({ page }) => {
  //mainHeader
  await page.goto("http://localhost:3000/");
  const heading = page.locator('[data-testid="mainHeader"]');
  await heading.waitFor();
  await expect(heading).toBeVisible();
});
