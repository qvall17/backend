import { DataType } from "sequelize-typescript";
import { Sequelize as SequelizeJs } from "sequelize";

/**
 * Actions summary:
 *
 * Up:
 * addColumn "_password" to table "user"
 *
 * Down:
 * removeColumn "_password" from table "_password"
 *
 **/

export const info = {
    revision: "0002",
    name: "add-password",
    created: "2023-05-05T15:05:23.866Z",
    comment: "",
};

const migrationCommandsUp = [
    {
        fn: "addColumn",
        params: [
            "user",
            "_password",
            {
                type: DataType.STRING,
                field: "_password",
            },
        ],
    },
];

const migrationCommandsDown = [
    {
        fn: "removeColumn",
        params: ["user", "_password"],
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
