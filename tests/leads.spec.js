// @ts-check
const { test, expect } = require('@playwright/test');

test('deve cadastrar um lead na lista de espera', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.click('//button[text()="Aperte o play... se tiver coragem"]');

  await page.getByRole('button', {name: 'Aperte o play... se tiver coragem'}).click()

  await page.waitForTimeout(10000)
});
