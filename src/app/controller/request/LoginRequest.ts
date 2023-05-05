import { Request } from "express";
import { RestError } from "../../../utils/error";
import { isEmailValid } from "../../../utils/validator";

export class LoginRequest {
    public password: string;
    public email: string;

    constructor(request: Request) {
        const { password, email } = request.body;
        this.password = password;
        this.fillEmail(email);
    }

    /**
     * @param email
     */
    protected fillEmail(email: string): void {
        if (!isEmailValid(email)) throw new RestError("Invalid email", 400);
        this.email = email;
    }
}
