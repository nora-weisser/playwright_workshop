import fs from 'fs';
import path from 'path';

type StorageState = {
  origins: {
    origin: string;
    localStorage: { name: string; value: string }[];
  }[];
};

export function getJwtFromStorageState(): string {
  const storagePath = path.resolve('.auth/user.json');
  const storageState = JSON.parse(
    fs.readFileSync(storagePath, 'utf-8')
  ) as StorageState;

  const origin = storageState.origins.find(o =>
    o.origin.includes('conduit.bondaracademy.com')
  );

  if (!origin) {
    throw new Error('Origin not found in storageState');
  }

  const token = origin.localStorage.find(
    item => item.name === 'jwtToken'
  )?.value;

  if (!token) {
    throw new Error('jwtToken not found in storageState');
  }

  return token;
}
