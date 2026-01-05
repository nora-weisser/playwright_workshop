import { test as setup, request } from '@playwright/test';
import { userData } from '../datafactory/user.data';

const authFile = '.auth/user.json';

setup('authenticate', async ({  }) => {
    const context = await request.newContext({ storageState: undefined });
    await context.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            "user": { "email": userData.email, "password": userData.password }
        }
    })
    await context.storageState({ path: authFile });
});

