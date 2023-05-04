import { IUserRepository } from "../../domain/repository/IUserRepository";
import { UserModel } from "./model/UserModel";
import { User } from "../../domain/entity/User";
import clients from "../../../seed/clients";
import { RestError } from "../../utils/error";

export class SequelizeUserRepository implements IUserRepository {

    async findById(id: string): Promise<User> {
        const userModel = await UserModel.findByPk(id);
        if (!userModel) throw new RestError("User not found", 404);
        return this.transformModelToEntity(userModel);
    }

    async isAdmin(email: string): Promise<boolean> {
        const userModel = await UserModel.findOne({
            where: { email: email }
        });
        if (!userModel) throw new RestError("Forbidden", 403);
        const user = this.transformModelToEntity(userModel);
        return user.role === "admin";
    }

    async isValidUser(email: string): Promise<boolean> {
        const userModel = await UserModel.findOne({
            where: { email: email }
        });
        if (!userModel) throw new RestError("Forbidden", 403);
        else return true;
    }

    async findByUsername(username: string): Promise<User> {
        const userModel = await UserModel.findOne({
            where: { name: username }
        });
        if (!userModel) throw new RestError("User not found", 404);
        return this.transformModelToEntity(userModel);
    }

    async seed(): Promise<void> {
        clients.forEach((client) => {
            const userModel = new UserModel(client);
            userModel.save();
        });
    }

    private transformModelToEntity(model: UserModel): User {
        return {
            id: model.id,
            name: model.name,
            email: model.email,
            role: model.role,
        };
    }
}
