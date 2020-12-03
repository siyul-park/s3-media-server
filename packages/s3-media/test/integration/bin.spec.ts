import supertest from "supertest";
import * as fs from "fs";
import * as path from "path";
import createRequest from "../create-request";
import Link from "../../src/type/link";

let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  request = await createRequest();
});

describe("POST /bin/:style_id/:file_id", () => {
  test("success", async () => {
    const img = await fs.promises.readFile(
      path.join(__dirname, "../assets/image/upload-test-image.png")
    );

    const { body: fileInfo } = await request
      .post("/files/upload")
      .set("content-type", "application/octet-stream")
      .send(img)
      .expect(200);

    // eslint-disable-next-line no-restricted-syntax
    for await (const link of fileInfo.links as Link[]) {
      await request.get(link.href).expect(302);
    }
  });
});
