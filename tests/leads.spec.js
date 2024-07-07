// @ts-check
const { test, expect } = require('@playwright/test');

test('deve cadastrar um lead na lista de espera', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.click('//button[text()="Aperte o play... se tiver coragem"]')

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.getByPlaceholder('Seu nome completo').fill('Test Teste6')
  await page.getByPlaceholder('Seu email principal').fill('user6.test@gmai.com')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

//  Pegar o conteudo html em um determinado momento
//  await page.getByText('seus dados conosco').click()
//  const content = await page.content()
//  console.log(content)

//  await expect(page.getByTestId('modal').locator('.toast')).toHaveText(/Agradecemos por compartilhar/)
  await expect(page.getByTestId('modal').locator('.toast')).toBeHidden({timeout: 10000})

});

test('não deve cadastrar um lead com formato de email incorreto', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.click('//button[text()="Aperte o play... se tiver coragem"]')

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.getByPlaceholder('Seu nome completo').fill('Test Teste')
  await page.getByPlaceholder('Seu email principal').fill('test.com.br')

  await page.getByTestId('modal')
  .getByText('Quero entrar na fila!').click()

  await expect(page.getByTestId('modal').locator('.alert')).toHaveText('Email incorreto')

  await page.waitForTimeout(10000)
});


test('não deve cadastrar um lead com nome em branco', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.click('//button[text()="Aperte o play... se tiver coragem"]')

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.getByPlaceholder('Seu email principal').fill('test@gmail.com')

  await page.getByTestId('modal')
  .getByText('Quero entrar na fila!').click()

  await expect(page.getByTestId('modal').locator('.alert')).toHaveText('Campo obrigatório')

  await page.waitForTimeout(10000)
});

test('não deve cadastrar um lead com email em branco', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.click('//button[text()="Aperte o play... se tiver coragem"]')

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.getByPlaceholder('Seu nome completo').fill('Test Teste')

  await page.getByTestId('modal')
  .getByText('Quero entrar na fila!').click()

  await expect(page.getByTestId('modal').locator('.alert')).toHaveText('Campo obrigatório')

  await page.waitForTimeout(10000)
});

test('não deve cadastrar um lead com nome e email em branco', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.click('//button[text()="Aperte o play... se tiver coragem"]')

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.getByTestId('modal')
  .getByText('Quero entrar na fila!').click()

  await expect(page.getByTestId('modal').locator('.alert')).toHaveText(['Campo obrigatório', 'Campo obrigatório'])

  await page.waitForTimeout(10000)
});