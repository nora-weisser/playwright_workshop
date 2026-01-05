import { test as setup } from '../fixtures/test-options';
import { expect } from '@playwright/test';
import { userData } from '../datafactory/user.data';

const authFile = '.auth/user.json'

setup('authentication', async ({ page, pages}) => {
    await page.goto('/login')
    await pages.loginPage.login(userData.email, userData.password);
    await expect(page.getByRole('link', { name: 'data_management_demo' })).toBeVisible();
    await page.context().storageState({ path: authFile });
    
})