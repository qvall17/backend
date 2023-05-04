import { Request, Response } from "express";
import { RestError } from "../../utils/error";
import { BaseController, Route } from "./BaseController";
import { UserUseCase } from "../../domain/usecase/UserUseCase";

enum Routes {
    GET = "/",
    SEED = "/seed",
}

export class UserController extends BaseController {
    private static readonly baseRoute = "/user";

    constructor(private readonly userUseCase: UserUseCase) {
        super(UserController.baseRoute);
    }

    get routes(): Route[] {
        return [
            {
                method: "get",
                route: Routes.GET,
                middlewares: [],
                execute: this.getUser,
            },
            {
                method: "post",
                route: Routes.SEED,
                middlewares: [],
                execute: this.createSeed,
            },
        ];
    }

    /**
     * GET BY ID OR USERNAME
     */
    private getUser = async (req: Request, res: Response) => {
        try {
            const { id, username, email } = req.query;
            let user = null;
            if (email) await this.userUseCase.isValidUser(email.toString());
            else res.status(400).json({status: 400, message: "Identify with your email and present a username or id"})

            if (id) user = await this.userUseCase.findById(id.toString());
            else if (username) user = await this.userUseCase.findByUsername(username.toString());
            if (user) res.json({ user: user });
            else res.status(400).json({status: 400, message: "Username or id must be present"})
        } catch (err) {
            return RestError.manageServerError(res, err);
        }
    };

    /**
     * CREATE SEED
     */
    private createSeed = async (req: Request, res: Response) => {
        try {
            await this.userUseCase.seed();
            res.json({
                status: "ok",
            });
        } catch (err) {
            return RestError.manageServerError(res, err);
        }
    };

}
