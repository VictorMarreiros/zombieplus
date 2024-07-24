const { test } = require('../support')


test('CT-01: deve logar como administrador', async ({ page }) => {
    await page.login.visit()

    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()
})

test('CT-02: não deve logar com senha incorreta', async ({ page }) => {
    await page.login.visit()

    await page.login.submit('admin@zombieplus.com', 'abc123')

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await page.toast.containText(message)
})

test('CT-03: não deve logar com email em branco', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('', 'abc123')

    await page.login.alertHaveText('Campo obrigatório')
})

test('CT-04: não deve logar com sehna em branco', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', '')

    await page.login.alertHaveText('Campo obrigatório')
})

test('CT-05: não deve logar com email e senha em branco', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('', '')

    await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})

test('CT-06: não deve logar com email incorreto', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('abc.com.br', 'abc123')

    await page.login.alertHaveText('Email incorreto')
})
