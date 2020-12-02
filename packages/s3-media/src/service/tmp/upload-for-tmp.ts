import fs from "fs";

import pipeline from "../stream/pipeline";
import tmpPath from "./tmpPath";

async function uploadForTmp(stream: NodeJS.ReadableStream): Promise<string> {
  const path = await tmpPath();
  const outStream = fs.createWriteStream(path);

  await pipeline([stream, outStream]);

  return path;
}

export default uploadForTmp;
