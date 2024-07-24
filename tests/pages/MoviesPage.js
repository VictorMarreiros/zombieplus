const { expect } = require('@playwright/test')
export class MoviesPage {

    constructor(page) {
        this.page = page
    }

    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle', { timeout: 5000 })
        await expect(this.page).toHaveURL(/.*movies/)
    }

    async create(title, overview, company, release_year) {
        await this.page.locator('a[href$="register"]').click()

        await this.page.getByLabel('Titulo do filme').fill(title)
        await this.page.getByLabel('Sinopse').fill(overview)

        await this.page.locator('(//div[@class="react-select__indicators css-1wy0on6"])[1]').click()
        await this.page.locator('.react-select__option').filter({ hasText: company }).click()
        
        await this.page.locator('(//div[@class="react-select__indicators css-1wy0on6"])[2]').click()
        await this.page.locator('.react-select__option').filter({ hasText: release_year }).click()

    }
}