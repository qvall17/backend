import { Request } from "express";
import { HttpStatusCode, RestError } from "../../../utils/error";
import { isEmailValid, isPasswordValid } from "../../../utils/validator";

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
        if(!isPasswordValid(password)) throw new RestError("Invalid password", HttpStatusCode.BAD_REQUEST);
        if (password !== confirmPassword) throw new RestError("Passwords don't match", HttpStatusCode.BAD_REQUEST);
        this.newPassword = password;
    }

    /**
     * @param email
     */
    protected fillEmail(email: string): void {
        if (!isEmailValid(email)) throw new RestError("Invalid email", HttpStatusCode.BAD_REQUEST);
        this.email = email;
    }
}
