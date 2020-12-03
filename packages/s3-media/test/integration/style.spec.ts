import supertest from "supertest";
import uniqid from "uniqid";
import createRequest from "../create-request";

let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  request = await createRequest();
});

describe("POST /styles", () => {
  test("success", async () => {
    const { body } = await request
      .post("/styles")
      .send({ id: uniqid() })
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
    const id = uniqid();
    const width = 100;

    await request.post("/styles").send({ id }).expect(201);
    const { body } = await request
      .put(`/styles/${id}`)
      .send({ id, width })
      .expect(200);

    expect(body.id).toEqual(id);
    expect(body.width).toEqual(width);
  });
});

describe("PATCH /styles/:style_id", () => {
  test("success", async () => {
    const id = uniqid();
    const width = 100;

    await request.post("/styles").send({ id }).expect(201);
    const { body } = await request
      .patch(`/styles/${id}`)
      .send({ width })
      .expect(200);

    expect(body.id).toEqual(id);
    expect(body.width).toEqual(width);
  });
});

describe("DELETE /styles/:style_id", () => {
  test("success", async () => {
    const id = uniqid();

    await request.post("/styles").send({ id }).expect(201);
    await request.delete(`/styles/${id}`).expect(204);
  });
});

describe("GET /styles/:style_id", () => {
  test("success", async () => {
    const id = "original";

    const { body } = await request.get(`/styles/${id}`).expect(200);

    expect(body.id).toEqual(id);
  });
});
