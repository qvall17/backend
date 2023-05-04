import path from "path";
import Umzug from "umzug";
import { sequelize } from "../../src/infrastructure/persistence/sequielize";

export const umzug = new Umzug({
    migrations: {
        // indicates the folder containing the migration .js files
        path: path.join(__dirname, "../"),
        pattern: /^(.*)(\.js|\.ts)$/,
        // inject sequelize's QueryInterface in the migrations
        params: [sequelize],
    },
    // indicates that the migration data should be store in the database
    // itself through sequelize. The default configuration creates a table
    // named `SequelizeMeta`.
    storage: "sequelize",
    storageOptions: {
        sequelize: sequelize,
    },
});
