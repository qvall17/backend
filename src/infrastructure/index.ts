/**
 Infrastructure layer dependency injector
 */
import { SequelizeUserRepository } from "./persistence/SequelizeUserRepository";
import { SequelizePolicyRepository } from "./persistence/SequelizePolicyRepository";
export const UserRepository = new SequelizeUserRepository();
export const PolicyRepository = new SequelizePolicyRepository();

