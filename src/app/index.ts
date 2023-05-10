/**
 App layer dependency injector
 */
import { BaseController } from "./controller/BaseController";
import { UserController } from "./controller/UserController";
import { PolicyController } from "./controller/PolicyController";
import { SessionMiddleware as SessionMiddlewareClass } from "./middleware/SessionMiddleware";
import { PolicyUseCase, UserUseCase } from "../domain";

/** Create Middlewares */
export const SessionMiddleware = new SessionMiddlewareClass(process.env.SECRET);

/** Register Controllers */
export const ApiControllers: BaseController[] = [
    new UserController(UserUseCase, SessionMiddleware),
    new PolicyController(PolicyUseCase, UserUseCase, SessionMiddleware),
];
