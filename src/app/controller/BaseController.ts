import { NextFunction, Request, Response, Router } from "express";

export type Route = {
    method: "get" | "post";
    route: string;
    middlewares: ((req: Request, res: Response, next: NextFunction) => void)[];
    execute: (req: Request, res: Response) => void;
};

export abstract class BaseController {
    protected constructor(public baseRoute: string) {}

    registerRoutes(router: Router): void {
        for (const route of this.routes) {
            router[route.method](this.baseRoute + route.route, route.middlewares, route.execute);
        }
    }
    get routes(): Route[] {
        return [];
    }
}
