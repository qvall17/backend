import { Request, Response } from "express";
import { BaseController, Route } from "./BaseController";
import { UserUseCase } from "../../domain/usecase/UserUseCase";
import { RegisterRequest } from "./request/RegisterRequest";
import { LoginRequest } from "./request/LoginRequest";
import { SessionMiddleware } from "../middleware/SessionMiddleware";
import { tryCatch } from "../../utils/tryCatch";
import { RestError } from "../../utils/error";
import { UserRequest } from "./request/UserRequest";
import { HttpStatusCode } from "../../utils/HttpStatusCode";

enum Routes {
    GET = "/",
    SEED = "/seed",
    REGISTER = "/register",
    LOGIN = "/login",
    LOGOUT = "/logout"
}

export class UserController extends BaseController {
    private static readonly baseRoute = "/user";
    private userUseCase: UserUseCase;
    private sessionMiddleware: SessionMiddleware;

    constructor(userUseCase: UserUseCase, sessionMiddleware: SessionMiddleware ) {
        super(UserController.baseRoute);
        this.userUseCase = userUseCase;
        this.sessionMiddleware = sessionMiddleware;
    }

    get routes(): Route[] {
        return [
            {
                method: "get",
                route: Routes.GET,
                middlewares: [this.sessionMiddleware.isLogged],
                execute: tryCatch(this.getUser),
            },
            {
                method: "post",
                route: Routes.SEED,
                middlewares: [],
                execute: tryCatch(this.createSeed),
            },
            {
                method: "post",
                route: Routes.REGISTER,
                middlewares: [],
                execute: tryCatch(this.register),
            },
            {
                method: "post",
                route: Routes.LOGIN,
                middlewares: [],
                execute: tryCatch(this.login),
            },
            {
                method: "post",
                route: Routes.LOGOUT,
                middlewares: [this.sessionMiddleware.isLogged],
                execute: tryCatch(this.logout),
            },
        ];
    }

    /**
     * GET BY ID OR NAME
     */

    private getUser = async (req: Request, res: Response) => {
        const { id, name } = new UserRequest(req);
        let user = null;
        if (id) user = await this.userUseCase.findById(id);
        else if (name) user = await this.userUseCase.findByName(name);
        res.json({ user: user });
    };

    /**
     * Register user
     */
    private register = async (req: Request, res: Response) => {
        const { email, newPassword } = new RegisterRequest(req);
        const user = await this.userUseCase.findByEmail(email);
        await this.userUseCase.changePassword(user.id, newPassword);
        const token = this.sessionMiddleware.getAuthorizationToken(res, user);
        res.json({
            user: user,
            token: token,
        });
    };

    /**
     * Login user
     */
    private login = async (req: Request, res: Response) => {
        const { email, password } = new LoginRequest(req);
        const matches = await this.userUseCase.checkUserMatchPassword(email, password);
        if (matches) {
            const user = await this.userUseCase.findByEmail(email);
            const token = this.sessionMiddleware.getAuthorizationToken(res, user);
            res.json({
                user: user,
                token: token,
            });
        } else {
            throw new RestError("Invalid email or password", HttpStatusCode.BAD_REQUEST);
        }
    };

    /**
     * GET: LOGOUT
     */
    private logout = (req: Request, res: Response) => {
        this.sessionMiddleware.logout(res);
        res.json({
            status: "ok",
        });
    };

    /**
     * CREATE SEED
     */
    private createSeed = (req: Request, res: Response) => {
        this.userUseCase.seed();
        res.json({
            status: "ok",
        });
    };
}
