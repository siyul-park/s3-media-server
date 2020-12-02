import supertest from "supertest";
import * as fs from "fs";
import * as path from "path";
import createRequest from "../create-request";

let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  request = await createRequest();
});

describe("POST /files/upload", () => {
  test("success", async () => {
    const img = await fs.promises.readFile(
      path.join(__dirname, "../assets/image/upload-test-image.png")
    );

    const response = await request
      .post("/files/upload")
      .set("content-type", "application/octet-stream")
      .send(img)
      .expect(200);

    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBeDefined();
    expect(response.body.type).toBeDefined();
    expect(response.body.size).toBeDefined();
  });
});
