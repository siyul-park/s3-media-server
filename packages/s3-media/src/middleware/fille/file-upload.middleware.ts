import Application, { DefaultState } from "koa";
import Context from "../../type/context";
import Token from "../../s3/token";

const fileUploadMiddleware: Application.Middleware<
  DefaultState,
  Context
> = async (context, next) => {
  const s3Repository = await context.resolve(Token.S3_REPOSITORY);

  await s3Repository.upload({
    Key: "",
    Body: context.req,
  });

  await next();
};

export default fileUploadMiddleware;
