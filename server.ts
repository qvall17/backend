import { umzug } from "./migrations/scripts/umzug";
import cookieParser from "cookie-parser";
import logger from "morgan";
import express = require("express");
import http from "http";
import helmet from "helmet/dist";
import { Router } from "express";
import { ApiControllers, SessionMiddleware } from "./src/app";
import * as swaggerDocument from "./swagger.json";
import swaggerUi from "swagger-ui-express";
import { HttpStatusCode } from "./src/utils/HttpStatusCode";

const server = express();

export const run = async (): Promise<void> => {
    await umzug.up();

    /** Functional app setups **/
    server.use(logger("common"));
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(cookieParser());

    /** Setup middlewares **/
    server.use(helmet());
    server.use(SessionMiddleware.session);

    /** Setup controllers **/
    const ApiRouter = Router();
    ApiControllers.forEach((controller) => controller.registerRoutes(ApiRouter));
    server.use("/api", ApiRouter);
    server.use("/swagger", swaggerUi.serve, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    /** Not found and server error control **/
    server.use((req, res) => {
        res.status(HttpStatusCode.NOT_FOUND).json({ error: "Not found" });
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    server.use((error, req, res, next) => {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({ error: "Internal server error" });
    });

    http.createServer(server).listen(8080, () => {
        // eslint-disable-next-line no-console
        console.log("App listening on 8080");
    });
}

run();
