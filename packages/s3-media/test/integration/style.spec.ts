import supertest from "supertest";
import * as fs from "fs";
import * as path from "path";
import createRequest from "../create-request";

let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  request = await createRequest();
});

describe("POST /styles/:style_id/:file_id", () => {
  test("success: get original", async () => {
    const img = await fs.promises.readFile(
      path.join(__dirname, "../assets/image/upload-test-image.png")
    );

    const { body: fileInfo } = await request
      .post("/files/upload")
      .set("content-type", "application/octet-stream")
      .send(img)
      .expect(200);

    await request.get(fileInfo.links[0].href).expect(302);
  });

  test("success: get thumbnail", async () => {
    const img = await fs.promises.readFile(
      path.join(__dirname, "../assets/image/upload-test-image.png")
    );

    const { body: fileInfo } = await request
      .post("/files/upload")
      .set("content-type", "application/octet-stream")
      .send(img)
      .expect(200);

    await request.get(`/styles/thumbnail/${fileInfo.id}`).expect(302);
  });
});
