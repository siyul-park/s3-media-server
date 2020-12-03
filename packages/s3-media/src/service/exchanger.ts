import { inject, injectable } from "@cheeket/injector";
import * as fs from "fs";
import Token from "./token";
import tmpPath from "./tmp/tmpPath";
import FileKey from "../type/file-key";
import Uploader from "./uploader";
import Downloader from "./downloader";
import pipeline from "./stream/pipeline";

@injectable()
class Exchanger {
  constructor(
    @inject(Token.UPLOADER) private readonly uploader: Uploader,
    @inject(Token.DOWNLOADER) private readonly downloader: Downloader
  ) {}

  async exchange(source: FileKey, to: FileKey): Promise<void> {
    const readStream = await this.downloader.fetchReadStream(source);
    const filePath = await tmpPath();

    try {
      const stream = fs.createWriteStream(filePath);
      await pipeline([readStream, stream]);

      await this.uploader.upload(to, filePath);
    } finally {
      await fs.promises.unlink(filePath);
    }
  }
}

export default Exchanger;
