import { request } from '@playwright/test';
import { userData } from './datafactory/user.data';

export default async () => {
  const apiContext = await request.newContext();

  const response = await apiContext.post(
    'https://conduit-api.bondaracademy.com/api/users/login',
    {
        data: {
            "user": { "email": userData.email, "password": userData.password }
        }
    }
  );

  //const { user } = await response.json();

  await apiContext.storageState({
    path: 'storageState.json',
  });
};