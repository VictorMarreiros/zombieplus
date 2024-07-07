const { expect } = require('@playwright/test')

export class LoginPage {

    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('http://localhost:3000/admin/login')

        const loginForm = this.page.locator('.login-form')
        await expect(loginForm).toBeVisible()
    }

    async submit(email, senha) {

        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(senha)
        await this.page.getByText('Entrar').click()

    }

    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle', { timeout: 5000 })
        await expect(this.page).toHaveURL(/.*movies/)
    }

    async toastHaveText(message) {
        const toast = this.page.locator('.toast')

        await expect(toast).toHaveText(message)
        await expect(toast).not.toBeVisible({timeout: 5000})
    }

}
