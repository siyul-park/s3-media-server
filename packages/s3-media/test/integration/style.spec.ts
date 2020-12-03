import supertest from "supertest";
import * as fs from "fs";
import * as path from "path";
import createRequest from "../create-request";
import Link from "../../src/type/link";

let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  request = await createRequest();
});

describe("POST /styles", () => {
  test("success", async () => {
    const { body } = await request
      .post("/styles")
      .send({ id: "test" })
      .expect(201);

    expect(body.id).toBeDefined();
  });
});

describe("GET /styles", () => {
  test("success", async () => {
    const { body } = await request.get(`/styles`).expect(200);

    expect(body.length).toBeGreaterThan(0);
    expect(body[0].id).toBeDefined();
  });
});

describe("PUT /styles/:style_id", () => {
  test("success", async () => {
    const { body } = await request
      .put("/styles/test")
      .send({ id: "test" })
      .expect(200);

    expect(body.id).toBeDefined();
  });
});

describe("GET /styles/:style_id", () => {
  test("success", async () => {
    const id = "original";

    const { body } = await request.get(`/styles/${id}`).expect(200);

    expect(body.id).toEqual(id);
  });
});
