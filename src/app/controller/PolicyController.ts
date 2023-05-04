import { Request, Response } from "express";
import { RestError } from "../../utils/error";
import { BaseController, Route } from "./BaseController";
import { PolicyUseCase } from "../../domain/usecase/PolicyUseCase";
import { UserUseCase } from "../../domain/usecase/UserUseCase";

enum Routes {
    ALL = "/all",
    GET = "/user",
    CREATE = "/seed"
}

export class PolicyController extends BaseController {
    private static readonly baseRoute = "/policy";

    constructor(private readonly policyUseCase: PolicyUseCase, private readonly userUseCase: UserUseCase) {
        super(PolicyController.baseRoute);
    }

    get routes(): Route[] {
        return [
            {
                method: "get",
                route: Routes.ALL,
                middlewares: [],
                execute: this.getAll,
            },
            {
                method: "get",
                route: Routes.GET,
                middlewares: [],
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
            const { username, email } = req.query;
            let policies = null;
            if (username && email){
                const isAdmin = await this.userUseCase.isAdmin(email.toString()); //TODO: login users & auth middleware
                if (!isAdmin) res.status(400).json({ status: 401, message: "Unauthorized" });
                else {
                    policies = await this.policyUseCase.findByUsername(username.toString());
                    res.json({
                        policies: policies,
                        status: "ok",
                    });
                }

            }
            else res.status(400).json({ status: 400, message: "Identify with your email and present a username" });
        } catch (err) {
            return RestError.manageServerError(res, err);
        }
    };

    /**
     * GET USER BY POLICY NUMBER
     */
    private getUserById = async (req: Request, res: Response) => {
        try {
            const { id, email } = req.query;
            let user = null;
            if (id && email) {
                const isAdmin = await this.userUseCase.isAdmin(email.toString()); //TODO: login users & auth middleware
                if (!isAdmin) res.status(400).json({ status: 401, message: "Unauthorized" });
                else {
                    user = await this.policyUseCase.findUserById(id.toString());
                    res.json({
                        user: user,
                        status: "ok",
                    });
                }

            } else {
                res.status(400).json({ status: 400, message: "Identify with your email and present an id" });
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
