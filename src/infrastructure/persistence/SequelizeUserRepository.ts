import { IUserRepository } from "../../domain/repository/IUserRepository";
import { UserModel } from "./model/UserModel";
import { User, UserRole } from "../../domain/entity/User";
import clients from "../../../seed/clients";

export class SequelizeUserRepository implements IUserRepository {

    async findById(id: string): Promise<User> {
        const userModel: UserModel = await UserModel.findByPk(id);
        if (!userModel) return null;
        return this.transformModelToEntity(userModel);
    }

    async changePassword(id: string, newPassword: string): Promise<void> {
        const userModel: UserModel = await UserModel.findByPk(id);
        userModel.password = newPassword;
        userModel.save();
    }

    async matchPasswordForUser(user: User, plainPassword: string): Promise<boolean> {
        const userModel: UserModel | null = await UserModel.findByPk(user.id);
        if (!userModel) return false;
        return userModel.comparePlainPassword(plainPassword);
    }

    async findByName(name: string): Promise<User | null> {
        const userModel: UserModel = await UserModel.findOne({
            where: { name }
        });
        if (!userModel) return null;
        return this.transformModelToEntity(userModel);
    }

    async findByEmail(email: string): Promise<User> {
        const userModel: UserModel = await UserModel.findOne({
            where: { email }
        });
        if (!userModel) return null;
        return this.transformModelToEntity(userModel);
    }

    seed(): void {
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
            role: model.role as UserRole,
        };
    }
}
