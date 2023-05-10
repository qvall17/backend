import { Request } from "express";
import { HttpStatusCode, RestError } from "../../../utils/error";
import { isEmailValid, isPasswordValid } from "../../../utils/validator";

export class LoginRequest {
    public password: string;
    public email: string;

    constructor(request: Request) {
        const { password, email } = request.body;
        this.fillPassword(password);
        this.fillEmail(email);
    }

    /**
     * @param email
     */
    protected fillEmail(email: string): void {
        if (!isEmailValid(email)) throw new RestError("Invalid email", HttpStatusCode.BAD_REQUEST);
        this.email = email;
    }

    /**
     * @param password
     */
    protected fillPassword(password: string): void {
        if(!isPasswordValid(password)) throw new RestError("Invalid password", HttpStatusCode.BAD_REQUEST);
        this.password = password;
    }
}
