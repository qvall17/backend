import { Request, Response } from "express";
import { RestError } from "../../utils/error";
import { BaseController, Route } from "./BaseController";
import { PolicyUseCase } from "../../domain/usecase/PolicyUseCase";
import { UserUseCase } from "../../domain/usecase/UserUseCase";
import { SessionMiddleware } from "../middleware/SessionMiddleware";

enum Routes {
    ALL = "/all",
    GET = "/user",
    CREATE = "/seed"
}

export class PolicyController extends BaseController {
    private static readonly baseRoute = "/policy";
    private policyUseCase: PolicyUseCase;
    private userUseCase: UserUseCase;
    private sessionMiddleware: SessionMiddleware;
    constructor(policyUseCase: PolicyUseCase, userUseCase: UserUseCase, sessionMiddleware: SessionMiddleware) {
        super(PolicyController.baseRoute);

        this.sessionMiddleware = sessionMiddleware;
        this.policyUseCase = policyUseCase;
        this.userUseCase = userUseCase;
    }

    get routes(): Route[] {
        return [
            {
                method: "get",
                route: Routes.ALL,
                middlewares: [this.sessionMiddleware.isAdmin],
                execute: this.getAll,
            },
            {
                method: "get",
                route: Routes.GET,
                middlewares: [this.sessionMiddleware.isAdmin],
                execute: this.getUserById,
            },
            {
                method: "post",
                route: Routes.CREATE,
                middlewares: [],
                execute: this.createSeed,
            },
        ];
    }

    /**
     * GET ALL POLICIES BY USERNAME
     */
    private getAll = async (req: Request, res: Response) => {
        try {
            const { username } = req.query;
            if (username) {
                const policies = await this.policyUseCase.findByUsername(username.toString());
                res.json({
                    policies: policies,
                    status: "ok",
                });
            }
            else res.status(400).json({ status: 400, message: "Present a username" });
        } catch (err) {
            return RestError.manageServerError(res, err);
        }
    };

    /**
     * GET USER BY POLICY NUMBER
     */
    private getUserById = async (req: Request, res: Response) => {
        try {
            const { id } = req.query;
            if (id) {
                const user = await this.policyUseCase.findUserById(id.toString());
                res.json({
                    user: user,
                    status: "ok",
                });
            } else {
                res.status(400).json({ status: 400, message: "Present an id" });
            }
        } catch (err) {
            return RestError.manageServerError(res, err);
        }
    };

    /**
     * Create Seed
     */
    private createSeed = async (req: Request, res: Response) => {
        try {
            await this.policyUseCase.seed();

            res.json({
                status: "ok",
            });
        } catch (err) {
            return RestError.manageServerError(res, err);
        }
    };

}
