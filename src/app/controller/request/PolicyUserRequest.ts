import { Request } from "express";
import { HttpStatusCode, RestError } from "../../../utils/error";

export class PolicyUserRequest {
    public id: string;

    constructor(request: Request) {
        const { id } = request.query;
        if (id) this.id = id.toString();
        else throw new RestError("id required", HttpStatusCode.BAD_REQUEST);
    }
}
