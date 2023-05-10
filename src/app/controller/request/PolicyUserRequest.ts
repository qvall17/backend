import { Request } from "express";
import { RestError } from "../../../utils/error";
import { HttpStatusCode } from "../../../utils/HttpStatusCode";

export class PolicyUserRequest {
    public id: string;

    constructor(request: Request) {
        const { id } = request.query;
        if (id) this.id = id.toString();
        else throw new RestError("id required", HttpStatusCode.BAD_REQUEST);
    }
}
