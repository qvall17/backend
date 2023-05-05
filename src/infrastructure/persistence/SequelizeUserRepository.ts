import { IUserRepository } from "../../domain/repository/IUserRepository";
import { UserModel } from "./model/UserModel";
import { User } from "../../domain/entity/User";
import clients from "../../../seed/clients";
import { RestError } from "../../utils/error";

export class SequelizeUserRepository implements IUserRepository {

    async findById(id: string): Promise<User> {
        const userModel: UserModel = await UserModel.findByPk(id);
        if (!userModel) throw new RestError("User not found", 404);
        return this.transformModelToEntity(userModel);
    }

    async changePassword(email: string, newPassword: string): Promise<void> {
        const userModel: UserModel = await UserModel.findOne({
            where: { email: email }
        });
        if (!userModel) throw new RestError("User not found", 404);
        userModel.password = newPassword;
        userModel.save();
    }

    /**
     * Check if a password matches for the user
     * @param user
     * @param plainPassword
     */
    async matchPasswordForUser(user: User, plainPassword: string): Promise<boolean> {
        const userModel: UserModel | null = await UserModel.findByPk(user.id);
        if (!userModel) throw new RestError("User with email " + user.id + " not found in database", 404);
        return userModel.comparePlainPassword(plainPassword);
    }

    async findByUsername(username: string): Promise<User> {
        const userModel: UserModel = await UserModel.findOne({
            where: { name: username }
        });
        if (!userModel) throw new RestError("User not found", 404);
        return this.transformModelToEntity(userModel);
    }

    async findByEmail(email: string): Promise<User> {
        const userModel: UserModel = await UserModel.findOne({
            where: { email: email }
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
