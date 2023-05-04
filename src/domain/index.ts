/**
 Domain layer dependency injector
 */
import { UserUseCase as UserUseCaseClass } from "./usecase/UserUseCase";
import { PolicyUseCase as PolicyUseCaseClass } from "./usecase/PolicyUseCase";

import {
    UserRepository,
    PolicyRepository,
} from "../infrastructure";

export const UserUseCase = new UserUseCaseClass(
    UserRepository,
);
export const PolicyUseCase = new PolicyUseCaseClass(
    PolicyRepository,
    UserRepository,
);

