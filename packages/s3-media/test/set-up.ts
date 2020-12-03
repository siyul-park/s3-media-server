import * as fs from "fs";

if (
  process.env.AWS_S3_USE_MOCK ? process.env.AWS_S3_USE_MOCK === "true" : true
) {
  fs.mkdirSync("./data/styles", { recursive: true });
  fs.writeFileSync("./data/styles/original.json", '{"id": "original"}');
}
