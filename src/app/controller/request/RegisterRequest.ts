import { Request } from "express";
import { RestError } from "../../../utils/error";
import { isEmailValid } from "../../../utils/validator";

export class RegisterRequest {
    public newPassword: string;
    public email: string;

    constructor(request: Request) {
        const { password, confirmPassword, email } = request.body;
        this.fillPassword(password, confirmPassword);
        this.fillEmail(email);
    }

    /**
     * @param password
     * @param confirmPassword
     */
    protected fillPassword(password: string, confirmPassword: string): void {
        if (password !== confirmPassword) throw new RestError("Passwords don't match", 400);
        this.newPassword = password;
    }

    /**
     * @param email
     */
    protected fillEmail(email: string): void {
        if (!isEmailValid(email)) throw new RestError("Invalid email", 400);
        this.email = email;
    }
}
