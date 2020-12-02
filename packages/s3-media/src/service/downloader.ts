import { inject, injectable } from "@cheeket/injector";
import * as stream from "stream";

import S3Token from "../s3/token";
import Token from "./token";
import S3Repository from "../s3/s3-repository";
import JsonRepository from "../s3/json-repository";
import Style from "./style/style";
import NotFoundError from "../error/not-found-error";

@injectable()
class Downloader {
  constructor(
    @inject(S3Token.S3_REPOSITORY) private readonly s3Repository: S3Repository,
    @inject(Token.STYLE_REPOSITORY)
    private readonly styleRepository: JsonRepository<Style>
  ) {}

  async fetchDownloadUrl(where: string, id: string): Promise<string> {
    const link = await this.getDownloadUrl(where, id);
    if (link === undefined) {
      throw new NotFoundError(`${where}/${id} not found`);
    }

    return link;
  }

  async fetchReadStream(where: string, id: string): Promise<stream.Readable> {
    const readStream = await this.getReadStream(where, id);
    if (readStream === undefined) {
      throw new NotFoundError(`${where}/${id} not found`);
    }

    return readStream;
  }

  async getDownloadUrl(where: string, id: string): Promise<string | undefined> {
    const key = `${where}/${id}`;
    return this.s3Repository.getObjectSignedUrl({ Key: key });
  }

  async getReadStream(
    where: string,
    id: string
  ): Promise<stream.Readable | undefined> {
    const key = `${where}/${id}`;
    return this.s3Repository.getObjectReadStream({ Key: key });
  }
}

export default Downloader;
