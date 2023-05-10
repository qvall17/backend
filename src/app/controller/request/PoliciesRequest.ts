import { Request } from "express";
import { RestError } from "../../../utils/error";
import { HttpStatusCode } from "../../../utils/HttpStatusCode";

export class PoliciesRequest {
    public name: string;

    constructor(request: Request) {
        const { name } = request.query;
        if (name) this.name = name.toString();
        else throw new RestError("name required", HttpStatusCode.BAD_REQUEST);
    }
}
