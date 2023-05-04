import { AutoIncrement, Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

@Table({
    tableName: "user",
})
export class UserModel extends Model<UserModel> {
    @PrimaryKey
    @AutoIncrement
    @Column
    public id: string;

    @Column
    public name: string;

    @Column
    public email: string;

    @Column
    public role: string;

    @CreatedAt
    @Column
    public created_at: Date;

    @UpdatedAt
    @Column
    public updated_at: Date;

}
