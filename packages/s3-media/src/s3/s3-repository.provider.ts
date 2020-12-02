import { interfaces } from "cheeket";

import Token from "./token";
import S3Repository from "./s3-repository";
import S3RepositoryFactory from "./s3-repository-factory";

function s3RepositoryProvider(
  bucketName: string
): interfaces.Provider<S3Repository> {
  return async (context) => {
    const s3RepositoryFactory: S3RepositoryFactory = await context.resolve(
      Token.S3_REPOSITORY_FACTORY
    );
    return s3RepositoryFactory.create(bucketName);
  };
}

export default s3RepositoryProvider;
