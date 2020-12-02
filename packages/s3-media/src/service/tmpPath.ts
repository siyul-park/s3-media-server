import { tmpName, setGracefulCleanup } from "tmp-promise";

setGracefulCleanup();

async function tmpPath(): Promise<string> {
  return tmpName({ prefix: "media" });
}

export default tmpPath;
