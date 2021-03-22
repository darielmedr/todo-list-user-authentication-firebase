import User from "./user";

export class UserLoginEmailPassword extends User {
    constructor(
        email: string,
        password: string) {
        super(email, password)
    }
}