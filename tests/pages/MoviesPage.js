const { expect } = require('@playwright/test')
export class MoviesPage {

    constructor(page) {
        this.page = page
    }

    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle', { timeout: 5000 })
        await expect(this.page).toHaveURL(/.*movies/)
    }
}