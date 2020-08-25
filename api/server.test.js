const express = require("express");
const supertest = require("supertest");

const server = require("./server");
const db = require("../data/dbconnection");

describe("Get request", () => {
  it("returns 401 if no session is found", async () => {
    const res = await supertest(server).get("/api/users");
    expect(res.status).toBe(401);
  });

  it("returns a JSON object", async () => {
    const res = await supertest(server).get("/api/users");
    expect(res.type).toBe("application/json");
  });
});
