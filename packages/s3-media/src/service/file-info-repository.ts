import { inject, injectable } from "@cheeket/injector";

import S3Repository from "../s3/s3-repository";
import FileInfo from "../type/file-info";
import FileKey from "../type/file-key";
import convertMetaToInfo from "./converter/convert-meta-to-info";
import S3Token from "../s3/token";
import NotFoundError from "../error/not-found-error";

@injectable()
class FileInfoRepository {
  constructor(
    @inject(S3Token.S3_REPOSITORY) private readonly s3Repository: S3Repository
  ) {}

  async fetchById(fileKey: FileKey): Promise<FileInfo> {
    const info = await this.findById(fileKey);
    if (info === undefined) {
      throw new NotFoundError(`${fileKey.key} not found`);
    }

    return info;
  }

  async findById(fileKey: FileKey): Promise<FileInfo | undefined> {
    const fileInfo = await this.s3Repository.headObject({ Key: fileKey.key });
    if (fileInfo.Metadata === undefined) {
      return undefined;
    }

    return convertMetaToInfo(fileInfo.Metadata);
  }
}

export default FileInfoRepository;
