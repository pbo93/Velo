import { Page, expect } from "@playwright/test";

import { Navbar } from "../components/Navbar";

export class LandingPage{
    readonly navbar: Navbar

    constructor(private page: Page) {
        this.navbar = new Navbar(page)
    }

    async goto() {
        await this.page.goto('/')
        const title = this.page.getByTestId('hero-section').getByRole('heading')
        await expect(title).toContainText('Velô Sprint')
    }
}