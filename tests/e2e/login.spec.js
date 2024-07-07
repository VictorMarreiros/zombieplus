const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../pages/LoginPage')
const { Toast } = require('../pages/Components')

let loginPage
let toast

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    toast = new Toast(page)
})

test('deve logar como administrador', async ({ page }) => {
    await loginPage.visit()

    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await loginPage.isLoggedIn()
})

test('não deve logar com senha incorreta', async ({ page }) => {
    await loginPage.visit()

    await loginPage.submit('admin@zombieplus.com', 'abc123')
    
    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await toast.haveText(message)
})

test('não deve logar com email em branco', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('', 'abc123')
    
    await loginPage.alertEmailHaveText('Campo obrigatório')
})

test('não deve logar com sehna em branco', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', '')
    
    await loginPage.alertPwdHaveText('Campo obrigatório')
})