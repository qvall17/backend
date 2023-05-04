/**
 App layer dependency injector
 */
import { BaseController } from "./controller/BaseController";
import { UserController } from "./controller/UserController";
import { PolicyController } from "./controller/PolicyController";
import { PolicyUseCase, UserUseCase } from "../domain";

/** Register Controllers */
export const ApiControllers: BaseController[] = [
    new UserController(UserUseCase),
    new PolicyController(PolicyUseCase, UserUseCase),

];
