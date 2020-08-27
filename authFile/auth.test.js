const express = require("express");
const supertest = require("supertest");

const server = require("../api/server");
const db = require("../data/dbconnection");

describe("Register", () => {
  const testUser = {
    username: "paewill",
    name: "paewill",
    email: "paewill@paewill.com",
    password: "paewill",
  };

  const testUser2 = {
    username: "paewillTest2",
    name: "paewillTest2",
    email: "paewillTes2t@paewillTest2.com",
    password: "paewillTest2",
  };

  beforeEach(async () => {
    await supertest(server).post("/api/auth/register").send(testUser);
  });

  it("return 500 if user already exists", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send(testUser);
    return expect(res.status).toBe(500);
  });

  it("returns 500 if no password is entered", async () => {
    const data = { username: "david" };
    const res = await supertest(server).post("/api/auth/register").send(data);
    expect(res.statusCode).toBe(500);
  });

  it("returns a json object", async () => {
    const data = { username: "david", password: "david" };
    const res = await supertest(server).post("/api/auth/register").send(data);
    expect(res.type).toBe("application/json");
  });
});

describe("Login", () => {
  const testUser = {
    username: "paewill",
    name: "paewillTest",
    email: "paewillTest@paewillTest.com",
    password: "paewill",
  };

  it("Can login to existing user", async () => {
    const data = { username: "paewill", password: "paewill" };
    const res = await supertest(server).post("/api/auth/login").send(data);
    expect(res.status).toBe(200);
  });

  it("returns 401 if username does not exist", async () => {
    const data = { username: "david1234", password: "david" };
    const res = await supertest(server).post("/api/auth/login").send(data);
    expect(res.statusCode).toBe(401);
  });

  it("returns 500 if no username is entered", async () => {
    const data = { password: "david" };
    const res = await supertest(server).post("/api/auth/login").send(data);
    expect(res.statusCode).toBe(500);
  });
});
