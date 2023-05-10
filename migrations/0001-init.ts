import { DataType } from "sequelize-typescript";
import { Sequelize as SequelizeJs } from "sequelize";

/**
 * Actions summary:
 *
 * Up:
 * createTable "user", deps: []
 * createTable "policy", deps: []
 *
 * Down:
 * dropTable "user"
 * dropTable "policy"
 *
 **/

export const info = {
    revision: "0001",
    name: "init",
    created: "2023-05-04T10:32:48.661Z",
    comment: "",
};

const migrationCommandsUp = [
    {
        fn: "createTable",
        params: [
            "policy",
            {
                id: {
                    type: DataType.STRING,
                    field: "id",
                    primaryKey: true,
                },
                amountInsured: {
                    type: DataType.FLOAT,
                    field: "amountInsured",
                },
                inceptionDate: {
                    type: DataType.STRING,
                    field: "inceptionDate",
                },
                email: {
                    type: DataType.STRING,
                    field: "email",
                },
                clientId: {
                    type: DataType.STRING,
                    field: "clientId",
                },
                installmentPayment: {
                    type: DataType.BOOLEAN,
                    field: "installmentPayment",
                },
                created_at: {
                    type: DataType.DATE,
                    field: "created_at",
                },
                updated_at: {
                    type: DataType.DATE,
                    field: "updated_at",
                },
            },
            {},
        ],
    },
    {
        fn: "createTable",
        params: [
            "user",
            {
                id: {
                    type: DataType.STRING,
                    field: "id",
                    primaryKey: true,
                },
                name: {
                    type: DataType.STRING,
                    field: "name",
                    unique: true,
                },
                email: {
                    type: DataType.STRING,
                    field: "email",
                    unique: true,
                },
                role: {
                    type: DataType.STRING,
                    field: "role",
                },
                created_at: {
                    type: DataType.DATE,
                    field: "created_at",
                },
                updated_at: {
                    type: DataType.DATE,
                    field: "updated_at",
                },
            },
            {},
        ],
    },
];

const migrationCommandsDown = [
    {
        fn: "dropTable",
        params: ["user"],
    },
    {
        fn: "dropTable",
        params: ["policy"],
    },
];

const executeMigration =
    (commands) =>
    async (sequelize: SequelizeJs): Promise<void> => {
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");
        let i = 1;
        for (const command of commands) {
            // eslint-disable-next-line no-console
            console.log("[#" + i++ + "] execute: " + command.fn);
            await sequelize.getQueryInterface()[command.fn](...command.params);
        }
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
    };

export const up = executeMigration(migrationCommandsUp);
export const down = executeMigration(migrationCommandsDown);
