import { test, expect } from "@playwright/test";
test("Check Form visible for valid jsonData", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const textArea = page.locator('[data-testid="textarea"]');
  await textArea.fill(`{
    "formTitle": "Project Requirements Survey",
    "formDescription": "Please fill out this survey about your project needs",
    "fields": [
      {
        "id": "name",
        "type": "text",
        "label": "Full Name",
        "required": true,
        "placeholder": "Enter your full name"
      }
    ]
  }`);
  const element = page.locator('[data-testid="FormDisplay"]');
  await expect(element).toHaveCount(1);
});
test("Check input Field Visibile are not", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const textArea = page.locator('[data-testid="textarea"]');
  await textArea.fill(`{
      "formTitle": "Project Requirements Survey",
      "formDescription": "Please fill out this survey about your project needs",
      "fields": [
        {
          "id": "name",
          "type": "text",
          "label": "Full Name",
          "required": true,
          "placeholder": "Enter your full name"
        }
      ]
    }`);
  const element = page.locator('[data-testid="inputTextArea"]');
  await expect(element).toHaveCount(1);
});
test("Check Submit button is Visible for ValidJson Data", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const textArea = page.locator('[data-testid="textarea"]');
  await textArea.fill(`{
        "formTitle": "Project Requirements Survey",
        "formDescription": "Please fill out this survey about your project needs",
        "fields": [
          {
            "id": "name",
            "type": "text",
            "label": "Full Name",
            "required": true,
            "placeholder": "Enter your full name"
          }
        ]
      }`);
  const element = page.locator('[data-setid="submitButton"]');
  await element.waitFor();
  await expect(element).toBeVisible();
});
test("Check error message for empty field", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const textArea = page.locator('[data-testid="textarea"]');
  await textArea.fill(`{
          "formTitle": "Project Requirements Survey",
          "formDescription": "Please fill out this survey about your project needs",
          "fields": [
            {
              "id": "name",
              "type": "text",
              "label": "Full Name",
              "required": true,
              "placeholder": "Enter your full name"
            }
          ]
        }`);
  const element = page.locator('[data-setid="submitButton"]');
  await element.waitFor();
  element.click();
  const errorEle = page.locator('[data-testid="inputErrorMessage"]');
  await expect(errorEle).toHaveCount(1);
});
test("Check error message for data field", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const textArea = page.locator('[data-testid="textarea"]');
  await textArea.fill(`{
            "formTitle": "Project Requirements Survey",
            "formDescription": "Please fill out this survey about your project needs",
            "fields": [
              {
                "id": "name",
                "type": "text",
                "label": "Full Name",
                "required": true,
                "placeholder": "Enter your full name"
              }
            ]
          }`);

  const inputElement = page.locator('[data-testid="inputTextArea"]');
  await inputElement.fill("Rakesh");

  const element = page.locator('[data-setid="submitButton"]');
  await expect(element).toBeVisible();
  await expect(element).toBeEnabled();
  await element.click();

  const errorEle = page.locator('[data-testid="inputErrorMessage"]');
  await expect(errorEle).toHaveCount(0);
});
