import { Request, Response } from "express";
import { RestError } from "../../utils/error";
import { BaseController, Route } from "./BaseController";
import { UserUseCase } from "../../domain/usecase/UserUseCase";
import { RegisterRequest } from "./request/RegisterRequest";
import { LoginRequest } from "./request/LoginRequest";
import { SessionMiddleware } from "../middleware/SessionMiddleware";
import { User } from "../../domain/entity/User";

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
                execute: this.getUser,
            },
            {
                method: "post",
                route: Routes.SEED,
                middlewares: [],
                execute: this.createSeed,
            },
            {
                method: "post",
                route: Routes.REGISTER,
                middlewares: [],
                execute: this.register,
            },
            {
                method: "post",
                route: Routes.LOGIN,
                middlewares: [],
                execute: this.login,
            },
            {
                method: "post",
                route: Routes.LOGOUT,
                middlewares: [this.sessionMiddleware.isLogged],
                execute: this.logout,
            },
        ];
    }

    /**
     * GET BY ID OR USERNAME
     */
    private getUser = async (req: Request, res: Response) => {
        try {
            const { id, username } = req.query;
            let user = null;
            if (id) user = await this.userUseCase.findById(id.toString());
            else if (username) user = await this.userUseCase.findByUsername(username.toString());
            if (user) res.json({ user: user });
            else res.status(400).json({ status: 400, message: "Username or id must be present" });
        } catch (err) {
            return RestError.manageServerError(res, err);
        }
    };

    /**
     * Register user
     */
    private register = async (req: Request, res: Response) => {
        try {
            const registerRequest = new RegisterRequest(req);
            await this.userUseCase.changePassword(registerRequest.email, registerRequest.newPassword);
            const user: User = await this.userUseCase.findByEmail(registerRequest.email);
            const token = this.sessionMiddleware.getAuthorizationToken(res, user);
            res.json({
                status: "ok",
                user: user,
                token: token,
            });
        } catch (err) {
            return RestError.manageServerError(res, err);
        }
    };

    /**
     * Register user
     */
    private login = async (req: Request, res: Response) => {
        try {
            const loginRequest = new LoginRequest(req);
            const matches = await this.userUseCase.checkUserMatchPassword(loginRequest.email, loginRequest.password);
            if (matches) {
                const user: User = await this.userUseCase.findByEmail(loginRequest.email);
                const token = this.sessionMiddleware.getAuthorizationToken(res, user);
                res.json({
                    status: "ok",
                    user: user,
                    token: token,
                });
            } else {
                return RestError.manageServerError(res, new RestError("Invalid username or password", 400));
            }
        } catch (err) {
            return RestError.manageServerError(res, err);
        }
    };

    /**
     * GET: LOGOUT
     */
    private logout = async (req: Request, res: Response) => {
        try {
            this.sessionMiddleware.logout(res);
            res.json({
                status: "ok",
            });
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
