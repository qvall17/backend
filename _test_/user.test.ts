import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import { HttpStatusCode } from "../src/utils/HttpStatusCode";
import clients from "../seed/clients";
import policies from "../seed/policies";

const baseURL = "http://localhost:8080";
const user = clients[2];
const testUser = clients[1];
const policy = policies[0]; // clientId is testUser.id

describe("User tests", () => {
    let token = "";
    test("Register user (userRole: user)", async () => {
        const response = await request(baseURL).post("/api/user/register").send({
            email: user.email,
            password: "123qweQWE",
            confirmPassword: "123qweQWE",
        });
        token = response.body.token;
        expect(response.statusCode).toBe(HttpStatusCode.OK);
    });
    test("Get policies by user name", async () => {
        const response = await request(baseURL).get("/api/policy/all")
            .query({ name: testUser.name })
            .set("token", `${token}`);
        expect(response.statusCode).toBe(HttpStatusCode.UNAUTHORIZED);
    });
    test("Get user from policy number", async () => {
        const response = await request(baseURL).get("/api/policy/user")
            .query({ id: policy.id })
            .set("token", `${token}`);
        expect(response.statusCode).toBe(HttpStatusCode.UNAUTHORIZED);
    });
    test("Get user by name", async () => {
        const response = await request(baseURL).get("/api/user")
          .query({ name: testUser.name })
          .set("token", `${token}`);
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(response.body.user).toEqual(testUser);
    });
});