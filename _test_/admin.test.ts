import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import { HttpStatusCode } from "../src/utils/HttpStatusCode";
import clients from "../seed/clients";
import policies from "../seed/policies";

const baseURL = "http://localhost:8080";
const userAdmin = clients[0];
const testUser = clients[1];
const policy = policies[0]; // clientId is testUser.id

describe("Admin tests", () => {
    let token = "";
    test("Register user (userRole: admin)", async () => {
        const response = await request(baseURL).post("/api/user/register").send({
            email: userAdmin.email,
            password: "123qweQWE",
            confirmPassword: "123qweQWE",
        });
        token = response.body.token;
        expect(response.statusCode).toBe(HttpStatusCode.OK);
    });
    test("Get policies by name", async () => {
        const response = await request(baseURL).get("/api/policy/all")
            .query({ name: testUser.name })
            .set("token", `${token}`);
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(response.body.policies).toBeDefined();
    });
    test("Get user from policy number", async () => {
        const response = await request(baseURL).get("/api/policy/user")
            .query({ id: policy.id })
            .set("token", `${token}`);
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(response.body.user).toEqual(testUser);
    });
    test("Get user by id", async () => {
        const response = await request(baseURL).get("/api/user")
          .query({ id: testUser.id })
          .set("token", `${token}`);
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(response.body.user).toEqual(testUser);
    });
});