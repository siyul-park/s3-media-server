import { inject, injectable } from "@cheeket/injector";
import * as fs from "fs";
import sharp from "sharp";

import S3Token from "../s3/token";
import Token from "./token";
import S3Repository from "../s3/s3-repository";
import JsonRepository from "../s3/json-repository";
import S3FileInfo from "../type/s3-file-info";
import getFileInfoMeta from "./get-file-info-meta";
import tmpPath from "./tmp/tmpPath";
import Style from "../type/style";
import unlink from "./fs/unlink";
import convertInfoToMeta from "./converter/convert-info-to-meta";
import FileInfo from "../type/file-info";
import FileKey from "../type/file-key";

@injectable()
class Uploader {
  constructor(
    @inject(S3Token.S3_REPOSITORY) private readonly s3Repository: S3Repository,
    @inject(Token.STYLE_REPOSITORY)
    private readonly styleRepository: JsonRepository<Style>
  ) {}

  async upload(fileKey: FileKey, path: string): Promise<S3FileInfo> {
    const style = await this.styleRepository.fetch(fileKey.style);

    const resizedFilePath = await tmpPath();

    try {
      await sharp(path).resize(style).toFile(resizedFilePath);

      const fileInfoMeta = await getFileInfoMeta(resizedFilePath);
      const fileInfoPrimary = { id: fileKey.id };
      const fileInfo: FileInfo = { ...fileInfoMeta, ...fileInfoPrimary };

      const readableStream = fs.createReadStream(resizedFilePath);

      const contentType = fileInfo.type;

      const response = await this.s3Repository.upload({
        Key: fileKey.key,
        Body: readableStream,
        ContentLength: fileInfo.size,
        ContentType: contentType,
        Metadata: convertInfoToMeta(fileInfo),
      });

      return {
        ...fileInfo,
        key: response.Key,
        bucket: response.Bucket,
        location: response.Location,
      };
    } finally {
      await unlink(resizedFilePath);
    }
  }
}

export default Uploader;
