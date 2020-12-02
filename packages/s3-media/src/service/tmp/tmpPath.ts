import { tmpName } from "tmp-promise";

async function tmpPath(): Promise<string> {
  return tmpName({ prefix: "media" });
}

export default tmpPath;
