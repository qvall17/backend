import { Request } from "express";
import { HttpStatusCode, RestError } from "../../../utils/error";

export class PoliciesRequest {
    public name: string;

    constructor(request: Request) {
        const { name } = request.query;
        if (name) this.name = name.toString();
        else throw new RestError("name required", HttpStatusCode.BAD_REQUEST);
    }
}
