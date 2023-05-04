import { umzug } from "./migrations/scripts/umzug";
import express = require("express");
import http from "http";
import helmet from "helmet/dist";
import { Router } from "express";
import { ApiControllers } from "./src/app";

const server: express.Application = express();

export const run = async (): Promise<void> => {
    await umzug.up();

    server.use(express.json());
    server.use(express.text());

    /** Setup middlewares **/
    server.use(
        helmet({
            contentSecurityPolicy: false,
        }),
    );
    server.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        next();
    });

    /** Setup controllers **/
    const ApiRouter = Router();
    ApiControllers.forEach((controller) => controller.registerRoutes(ApiRouter));
    server.use("/api", ApiRouter);

    /** Not found and server error control **/
    server.use((req, res) => {
        res.status(404).json({ error: "Not found" });
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    server.use((error, req, res, next) => {
        res.status(500).json({ error: "Internal server error" });
    });

    http.createServer(server).listen(8080, () => {
        // eslint-disable-next-line no-console
        console.log("App listening on 8080");
    });
}

run();
