import { interfaces } from "cheeket";
import * as AWS from "aws-sdk";

import S3RepositoryFactory from "./s3-repository-factory";

const Token = Object.freeze({
  S3: AWS.S3 as interfaces.Token<AWS.S3>,
  S3_REPOSITORY_FACTORY: S3RepositoryFactory as interfaces.Token<
    S3RepositoryFactory
  >,
});

export default Token;
