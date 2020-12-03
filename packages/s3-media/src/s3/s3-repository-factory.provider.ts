import { interfaces } from "cheeket";

import Token from "./token";
import S3RepositoryFactory from "./s3-repository-factory";

function s3RepositoryFactoryProvider(): interfaces.Provider<S3RepositoryFactory> {
  return async (context) => {
    return new S3RepositoryFactory(await context.resolve(Token.S3));
  };
}

export default s3RepositoryFactoryProvider;
