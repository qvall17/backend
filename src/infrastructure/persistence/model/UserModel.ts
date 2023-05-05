import { AutoIncrement, Column, CreatedAt, Model, PrimaryKey, Table, Unique, UpdatedAt } from "sequelize-typescript";
import * as bcrypt from "bcryptjs";

@Table({
    tableName: "user",
})
export class UserModel extends Model<UserModel> {
    @PrimaryKey
    @AutoIncrement
    @Column
    public id: string;

    @Unique
    @Column
    public name: string;

    @Unique
    @Column
    public email: string;

    @Column
    public role: string;

    @Column
    private _password: string;

    @CreatedAt
    @Column
    public created_at: Date;

    @UpdatedAt
    @Column
    public updated_at: Date;
    set password(password: string) {
        this._password = bcrypt.hashSync(password);
    }
    public comparePlainPassword(plainPassword: string): boolean {
        return bcrypt.compareSync(plainPassword, this._password);
    }

}
