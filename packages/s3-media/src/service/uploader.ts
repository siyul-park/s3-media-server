import { inject, injectable } from "@cheeket/injector";
import * as fs from "fs";
import sharp from "sharp";

import S3Token from "../s3/token";
import Token from "./token";
import S3Repository from "../s3/s3-repository";
import JsonRepository from "../s3/json-repository";
import S3FileInfo from "../type/s3-file-info";
import getFileInfo from "./get-file-info";
import tmpPath from "./tmpPath";
import Style from "./style/style";
import unlink from "./unlink";

@injectable()
class Uploader {
  constructor(
    @inject(S3Token.S3_REPOSITORY) private readonly s3Repository: S3Repository,
    @inject(Token.STYLE_REPOSITORY)
    private readonly styleRepository: JsonRepository<Style>
  ) {}

  async upload(path: string, where: string): Promise<S3FileInfo> {
    const style = await this.styleRepository.fetch(where);

    const resizedFilePath = await tmpPath();

    await sharp(path).resize(style).toFile(resizedFilePath);

    const fileInfo = await getFileInfo(resizedFilePath);
    const readableStream = fs.createReadStream(resizedFilePath);

    const contentType = fileInfo.type;

    const key = `${where}/${fileInfo.id}`;
    const response = await this.s3Repository.upload({
      Key: key,
      Body: readableStream,
      ContentLength: fileInfo.size,
      ContentType: contentType,
    });

    await unlink(resizedFilePath);

    return {
      ...fileInfo,
      key: response.Key,
      bucket: response.Bucket,
    };
  }
}

export default Uploader;
