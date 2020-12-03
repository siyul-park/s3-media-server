import supertest from "supertest";
import * as fs from "fs";
import * as path from "path";
import createRequest from "../create-request";

let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  request = await createRequest();
});

describe("GET /metas/:style_id/:file_id", () => {
  test("success", async () => {
    const img = await fs.promises.readFile(
      path.join(__dirname, "../assets/image/upload-test-image.png")
    );

    const { body: uploadResult } = await request
      .post("/files/upload")
      .set("content-type", "application/octet-stream")
      .send(img)
      .expect(200);

    const { body: info } = await request
      .get(`/metas/original/${uploadResult.id}`)
      .expect(200);

    expect(info.id).toEqual(uploadResult.id);
    expect(info.type).toEqual(uploadResult.type);
    expect(info.size).toEqual(uploadResult.size);
    expect(info.width).toEqual(uploadResult.width);
    expect(info.height).toEqual(uploadResult.height);
  });
});
