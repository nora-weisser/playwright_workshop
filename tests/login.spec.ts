import { test } from '../fixtures/test-options';

test.use({ storageState: { cookies: [], origins: [] } });

test('login with existing username and valid password', async ({ pages }) => {
  await pages.loginPage.goto('/');
});
