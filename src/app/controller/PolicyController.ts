import { Request, Response } from "express";
import { BaseController, Route } from "./BaseController";
import { PolicyUseCase } from "../../domain/usecase/PolicyUseCase";
import { UserUseCase } from "../../domain/usecase/UserUseCase";
import { SessionMiddleware } from "../middleware/SessionMiddleware";
import { tryCatch } from "../../utils/tryCatch";
import { PolicyUserRequest } from "./request/PolicyUserRequest";
import { PoliciesRequest } from "./request/PoliciesRequest";

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
                execute: tryCatch(this.getAll),
            },
            {
                method: "get",
                route: Routes.GET,
                middlewares: [this.sessionMiddleware.isAdmin],
                execute: tryCatch(this.getUserById),
            },
            {
                method: "post",
                route: Routes.CREATE,
                middlewares: [],
                execute: tryCatch(this.createSeed),
            },
        ];
    }

    /**
     * GET ALL POLICIES BY NAME
     */
    private getAll = async (req: Request, res: Response) => {
        const { name } = new PoliciesRequest(req);
        const policies = await this.policyUseCase.findByName(name.toString());
        res.json({
            policies: policies,
            status: "ok",
        });
    };

    /**
     * GET USER BY POLICY NUMBER
     */
    private getUserById = async (req: Request, res: Response) => {
        const { id } = new PolicyUserRequest(req);
        const user = await this.policyUseCase.findUserById(id.toString());
        res.json({
            user: user,
            status: "ok",
        });
    };

    /**
     * Create Seed
     */
    private createSeed = async (req: Request, res: Response) => {
        await this.policyUseCase.seed();
        res.json({
            status: "ok",
        });
    };
}
