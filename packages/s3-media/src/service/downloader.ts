import { inject, injectable } from "@cheeket/injector";
import * as stream from "stream";

import S3Token from "../s3/token";
import Token from "./token";
import S3Repository from "../s3/s3-repository";
import JsonRepository from "../s3/json-repository";
import Style from "./style/style";
import NotFoundError from "../error/not-found-error";
import FileKey from "../type/file-key";

@injectable()
class Downloader {
  constructor(
    @inject(S3Token.S3_REPOSITORY) private readonly s3Repository: S3Repository,
    @inject(Token.STYLE_REPOSITORY)
    private readonly styleRepository: JsonRepository<Style>
  ) {}

  async fetchDownloadUrl(fileKey: FileKey): Promise<string> {
    const link = await this.getDownloadUrl(fileKey);
    if (link === undefined) {
      throw new NotFoundError(`${fileKey.key} not found`);
    }

    return link;
  }

  async fetchReadStream(fileKey: FileKey): Promise<stream.Readable> {
    const readStream = await this.getReadStream(fileKey);
    if (readStream === undefined) {
      throw new NotFoundError(`${fileKey.key} not found`);
    }

    return readStream;
  }

  async getDownloadUrl(fileKey: FileKey): Promise<string | undefined> {
    const head = await this.s3Repository.headObject({ Key: fileKey.key });
    if (head.Metadata === undefined) {
      return undefined;
    }
    return this.s3Repository.getObjectSignedUrl({ Key: fileKey.key });
  }

  async getReadStream(fileKey: FileKey): Promise<stream.Readable | undefined> {
    return this.s3Repository.getObjectReadStream({ Key: fileKey.key });
  }
}

export default Downloader;
