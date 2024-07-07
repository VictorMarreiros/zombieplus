const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage')

let loginPage

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page)
})

test('deve logar como administrador', async ({ page }) => {
    await loginPage.visit()

    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await loginPage.isLoggedIn()

})

test('não deve logar com senha incorreta', async ({ page }) => {
    await loginPage.visit()

    await loginPage.submit('admin@zombieplus.com', 'abc123')
    await loginPage.toastHaveText('Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.')

})