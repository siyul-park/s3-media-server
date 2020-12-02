import { inject, injectable } from "@cheeket/injector";
import * as fs from "fs";
import sharp from "sharp";
import uniqid from "uniqid";

import S3Token from "../s3/token";
import Token from "./token";
import S3Repository from "../s3/s3-repository";
import JsonRepository from "../s3/json-repository";
import S3FileInfo from "../type/s3-file-info";
import getFileInfoMeta from "./get-file-info-meta";
import tmpPath from "./tmp/tmpPath";
import Style from "./style/style";
import unlink from "./fs/unlink";
import convertInfoToMeta from "./converter/convert-info-to-meta";
import FileInfo from "../type/file-info";

@injectable()
class Uploader {
  constructor(
    @inject(S3Token.S3_REPOSITORY) private readonly s3Repository: S3Repository,
    @inject(Token.STYLE_REPOSITORY)
    private readonly styleRepository: JsonRepository<Style>
  ) {}

  async upload(where: string, path: string, id?: string): Promise<S3FileInfo> {
    const style = await this.styleRepository.fetch(where);

    const resizedFilePath = await tmpPath();

    try {
      await sharp(path).resize(style).toFile(resizedFilePath);

      const fileInfoMeta = await getFileInfoMeta(resizedFilePath);
      const fileInfoPrimary = { id: id ?? uniqid() };
      const fileInfo: FileInfo = { ...fileInfoMeta, ...fileInfoPrimary };

      const readableStream = fs.createReadStream(resizedFilePath);

      const contentType = fileInfo.type;

      const key = `${where}/${fileInfo.id}`;
      const response = await this.s3Repository.upload({
        Key: key,
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
