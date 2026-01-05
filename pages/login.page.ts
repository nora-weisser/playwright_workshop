import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
	readonly email: Locator;
	readonly password: Locator;
	readonly loginButton: Locator;
	readonly header: Locator;

	constructor(page: Page) {
        super(page)
		this.email = page.getByRole('textbox', { name: 'Email' });
		this.password = page.getByRole('textbox', { name: 'Password' });
		this.loginButton = page.getByRole('button', {name: 'Sign in'});
		this.header = page.locator('app-layout-header').getByRole('link', { name: 'conduit' })
	}

	async login(username: string, password: string) {
		await this.email.fill(username);
		await this.password.fill(password);
		await this.loginButton.click();
	}

	async expectLoggedIn() {
		await expect(this.header).toBeVisible();
	}
}
