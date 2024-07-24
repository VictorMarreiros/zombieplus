const { test, expect } = require('../support');
const { faker } = require('@faker-js/faker');

test('CT-01: deve cadastrar um lead na lista de espera', async ({ page }) => {

  const leadName = faker.person.fullName() //  Rowan Nikolaus
  const leadEmail = faker.internet.email() // Kassandra.Haley@erich.biz

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await page.toast.containText(message)
});

test('CT-02: não deve cadastrar um lead com formato de email incorreto', async ({ page }) => {

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('Test Victor 1', 'testcom.br%')

  await page.landing.alertHaveText('Email incorreto')

});


test('CT-03: não deve cadastrar um lead com nome em branco', async ({ page }) => {

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', 'test.vtest@gmail.com')

  await page.landing.alertHaveText('Campo obrigatório')

});

test('CT-04: não deve cadastrar um lead com email em branco', async ({ page }) => {

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('Test Victor 1', '')

  await page.landing.alertHaveText('Campo obrigatório')

});

test('CT-05: não deve cadastrar um lead com nome e email em branco', async ({ page }) => {

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', '')

  await page.landing.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])

});

test('CT-06: não deve cadastrar um lead quando o email já existe', async ({ page, request }) => {

  const leadName = faker.person.fullName() //  Rowan Nikolaus
  const leadEmail = faker.internet.email() // Kassandra.Haley@erich.biz

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  console.log(newLead.text())

  expect(newLead.ok()).toBeTruthy()

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await page.toast.containText(message)
});