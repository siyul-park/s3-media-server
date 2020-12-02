import * as AWS from "aws-sdk";
import S3Repository from "./s3-repository";

class S3RepositoryFactory {
  constructor(public readonly s3: AWS.S3) {}

  create(bucketName: string): S3Repository {
    return new S3Repository(this.s3, bucketName);
  }
}

export default S3RepositoryFactory;
