// @ts-check
const { test, expect } = require('@playwright/test');
const {LandingPage} = require('./pages/LandingPage')

test('deve cadastrar um lead na lista de espera', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Test Victor 1', 'test.vtest@gmail.com')

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await landingPage.toastHaveText(message)
});

test('não deve cadastrar um lead com formato de email incorreto', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Test Victor 1', 'test.com.br')

  await page.getByTestId('modal')
  .getByText('Quero entrar na fila!').click()

  await landingPage.alertHaveText('Email incorreto')

  await page.waitForTimeout(10000)
});


test('não deve cadastrar um lead com nome em branco', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', 'test.vtest@gmail.com')

  await page.getByTestId('modal')
  .getByText('Quero entrar na fila!').click()

  await landingPage.alertHaveText('Campo obrigatório')

  await page.waitForTimeout(10000)
});

test('não deve cadastrar um lead com email em branco', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Test Victor 1', '')

  await page.getByTestId('modal')
  .getByText('Quero entrar na fila!').click()

  await landingPage.alertHaveText('Campo obrigatório')

  await page.waitForTimeout(10000)
});

test('não deve cadastrar um lead com nome e email em branco', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', '')

  await page.getByTestId('modal')
  .getByText('Quero entrar na fila!').click()

  await landingPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])

  await page.waitForTimeout(10000)
});