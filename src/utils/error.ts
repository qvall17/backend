import { Response } from "express";
import { HttpStatusCode } from "./HttpStatusCode";

export class RestError extends Error {
    public code?: HttpStatusCode;

    constructor(message: string, code?: number) {
        super(`${message}`);
        this.code = code;
        (Object as any).setPrototypeOf(this, new.target.prototype);
        this.name = "RestError";
    }

    public static manageServerError(res: Response, err: RestError): Response {
        if (err instanceof RestError) {
            return res.status(err.code || 417).json({ message: err.message });
        }
        console.error("[500] Internal error", { message: err });
        return res.status(HttpStatusCode.INTERNAL_SERVER).json({ message: "Internal error" });
    }
}
