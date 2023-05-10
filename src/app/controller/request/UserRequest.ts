import { Request } from "express";
import { HttpStatusCode, RestError } from "../../../utils/error";

export class UserRequest {
    public id?: string;
    public name?: string;

    constructor(request: Request) {
        const { id, name } = request.query;
        if (id) this.id = id.toString();
        else if (name) this.name = name.toString();
        else throw new RestError("name or id required", HttpStatusCode.BAD_REQUEST);
    }
}
