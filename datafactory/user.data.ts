import dotenv from 'dotenv';
import path from 'path';

// Load .env from project root (resolve from process.cwd() for robustness)
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export interface USER_DATA {
    email: string;
    password: string;
}

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

if (!email || !password) {
    throw new Error(
        'Missing EMAIL or PASSWORD environment variables. Create a .env in the project root with EMAIL and PASSWORD (e.g. EMAIL=you@example.com, PASSWORD=secret) or set them in the environment.'
    );
}

export const userData: USER_DATA = {
    email,
    password,
};