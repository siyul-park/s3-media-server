import Application, { DefaultState } from "koa";

import fs from "fs";
import Context from "../../type/context";
import Uploader from "../../service/uploader";
import Token from "../../service/token";
import tmpPath from "../../service/tmpPath";
import pipeline from "../../service/pipeline";
import unlink from "../../service/unlink";

const fileUploadMiddleware: Application.Middleware<
  DefaultState,
  Context
> = async (context, next) => {
  const uploader: Uploader = await context.resolve(Token.UPLOADER);

  const filePath = await tmpPath();
  const stream = fs.createWriteStream(filePath);
  await pipeline([context.req, stream]);

  context.body = await uploader.upload(filePath, "original");

  await unlink(filePath);

  await next();
};

export default fileUploadMiddleware;
