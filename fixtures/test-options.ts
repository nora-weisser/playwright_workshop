import { test as base, request, APIRequestContext } from '@playwright/test'
import { PageFactory } from '../pages/page.factory'
import { getJwtFromStorageState } from '../utils/auth'
import { APIHandler } from '../utils/api'

export interface TestOptions {
    pages: PageFactory
    apiHandler: APIHandler
}

export const test = base.extend<TestOptions>({
    pages: async ({ page }, use) => {
        const pages = new PageFactory(page);
        await use(pages);
    },
    apiHandler: async ({ }, use: (api: APIHandler) => Promise<void>) => {

        const token = getJwtFromStorageState();

        const api = await request.newContext({
            baseURL: 'https://conduit-api.bondaracademy.com',
            extraHTTPHeaders: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            },
        }) as APIRequestContext;

        const apiHandler = new APIHandler(api)
        await use(apiHandler);
        await api.dispose();
    },
})