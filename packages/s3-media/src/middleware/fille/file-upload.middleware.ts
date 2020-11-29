import Application, { DefaultState } from "koa";
import { tmpName } from "tmp-promise";
import * as fs from "fs";
import Context from "../../type/context";
import Token from "../../s3/token";
import pipeline from "../../stream/pipeline";

const fileUploadMiddleware: Application.Middleware<
  DefaultState,
  Context
> = async (context, next) => {
  const s3Repository = await context.resolve(Token.S3_REPOSITORY);

  const name = await tmpName();
  const outStream = fs.createWriteStream(name);

  await pipeline([context.req, outStream]);

  const inStream = fs.createReadStream(name);

  context.body = inStream;

  // await s3Repository.upload({
  //   Key: "",
  //   Body: context.req,
  // });

  await next();
};

export default fileUploadMiddleware;
