import { User } from "../models/user";

export class UserFactory {
    private static readonly PASSWORD = process.env.PASSWORD || '';

    static getStandardUser(): User {
        return {
            username: "standard_user",
            password: this.PASSWORD
        }
    }

    static getLockedOutUser(): User {
        return {
            username: "locked_out_user",
            password: this.PASSWORD
        }
    }
}