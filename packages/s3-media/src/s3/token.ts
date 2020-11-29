import { interfaces } from "cheeket";
import * as AWS from "aws-sdk";

import S3RepositoryFactory from "./s3-repository-factory";
import S3Repository from "./s3-repository";

const Token = Object.freeze({
  S3: AWS.S3 as interfaces.Token<AWS.S3>,
  S3_REPOSITORY_FACTORY: S3RepositoryFactory as interfaces.Token<
    S3RepositoryFactory
  >,
  S3_REPOSITORY: S3Repository as interfaces.Token<S3Repository>,
});

export default Token;
