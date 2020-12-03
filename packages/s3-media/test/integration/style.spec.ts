import supertest from "supertest";
import * as fs from "fs";
import * as path from "path";
import createRequest from "../create-request";
import Link from "../../src/type/link";

let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  request = await createRequest();
});

describe("GET /styles", () => {
  test("success", async () => {
    const { body } = await request.get(`/styles`).expect(200);

    expect(body.length).toBeGreaterThan(0);
    expect(body[0].id).toBeDefined();
  });
});

describe("GET /styles/:style_id", () => {
  test("success", async () => {
    const id = "original";

    const { body } = await request.get(`/styles/${id}`).expect(200);

    expect(body.id).toEqual(id);
  });
});

describe("POST /styles/:style_id/:file_id", () => {
  test("success", async () => {
    const img = await fs.promises.readFile(
      path.join(__dirname, "../assets/image/upload-test-image.png")
    );

    const { body: fileInfo } = await request
      .post("/files/upload")
      .set("content-type", "application/octet-stream")
      .send(img)
      .expect(200);

    await Promise.all(
      (fileInfo.links as Link[]).map(async (link: Link) => {
        await request.get(link.href).expect(302);
      })
    );
  });
});
