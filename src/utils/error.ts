import { Response } from "express";

export class RestError extends Error {
    public code?: number;

    constructor(message: string, code?: number) {
        super(`${message}`);
        this.code = code;
        (Object as any).setPrototypeOf(this, new.target.prototype);
        this.name = "RestError";
    }

    public static manageServerError(res: Response, err: RestError): Response {
        if (err instanceof RestError) {
            // Can log the error here
            return res.status(err.code || 417).json({ message: err.message /*, bodyErrors: err.bodyErrors*/ });
        }

        // Can put other types of errors and handlings here

        // @ts-ignore
        // eslint-disable-next-line no-console
        console.error("[500] Internal error", { message: err });
        return res.status(500).json({ message: "Internal error" /*, errorMessage: err.message*/ });
    }
}
