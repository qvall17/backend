import { Response } from "express";

export enum HttpStatusCode {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
}
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
        return res.status(500).json({ message: "Internal error" });
    }
}
