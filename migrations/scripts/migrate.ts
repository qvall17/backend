import { umzug } from "./umzug";
import * as process from "process";

(async () => {
    if (process.argv[2] !== "up" && process.argv[2] !== "down") {
        // eslint-disable-next-line no-console
        return console.log("Invalid parameter");
    }
    const rev = process.argv[3];
    if (rev) {
        await umzug[process.argv[2]]({ to: rev });
    } else {
        await umzug[process.argv[2]]();
    }
})();
