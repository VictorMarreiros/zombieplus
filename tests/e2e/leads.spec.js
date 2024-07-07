// @ts-check
const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const { LandingPage } = require('../pages/LandingPage')
const { Toast } = require('../pages/Components')

let landingPage
let toast

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page)
  toast = new Toast(page)
})

test('deve cadastrar um lead na lista de espera', async ({ page }) => {

  const leadName = faker.person.fullName(); // Rowan Nikolaus
  const leadEmail = faker.internet.email(); // Kassandra.Haley@erich.biz

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await toast.haveText(message)
});

test('não deve cadastrar um lead com formato de email incorreto', async ({ page }) => {

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Test Victor 1', 'test.com.br')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  await landingPage.alertHaveText('Email incorreto')

  await page.waitForTimeout(10000)
});


test('não deve cadastrar um lead com nome em branco', async ({ page }) => {

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', 'test.vtest@gmail.com')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  await landingPage.alertHaveText('Campo obrigatório')

  await page.waitForTimeout(10000)
});

test('não deve cadastrar um lead com email em branco', async ({ page }) => {

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Test Victor 1', '')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  await landingPage.alertHaveText('Campo obrigatório')

  await page.waitForTimeout(10000)
});

test('não deve cadastrar um lead com nome e email em branco', async ({ page }) => {

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', '')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  await landingPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])

});