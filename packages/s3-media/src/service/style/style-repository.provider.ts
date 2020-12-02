import { interfaces } from "cheeket";
import JsonRepository from "../../s3/json-repository";
import Style from "./style";
import Token from "../../s3/token";
import S3Repository from "../../s3/s3-repository";

function styleRepositoryProvider(): interfaces.Provider<JsonRepository<Style>> {
  return async (context) => {
    const s3Repository: S3Repository = await context.resolve(
      Token.S3_REPOSITORY
    );
    return new JsonRepository<Style>(s3Repository, "styles");
  };
}

export default styleRepositoryProvider;
