import Application, { DefaultState } from "koa";

import fs from "fs";
import Context from "../../type/context";
import Uploader from "../../service/uploader";
import Token from "../../service/token";
import tmpPath from "../../service/tmp/tmpPath";
import pipeline from "../../service/stream/pipeline";
import unlink from "../../service/fs/unlink";
import convertInfoToRelational from "../../service/converter/convert-info-to-relational";

const fileUploadMiddleware: Application.Middleware<
  DefaultState,
  Context
> = async (context, next) => {
  const uploader: Uploader = await context.resolve(Token.UPLOADER);

  const filePath = await tmpPath();
  try {
    const stream = fs.createWriteStream(filePath);
    await pipeline([context.req, stream]);

    const originalKey = "original";

    const fileInfo = await uploader.upload(originalKey, filePath);

    context.body = convertInfoToRelational(fileInfo, [
      { relation: "self", href: `/styles/${originalKey}/${fileInfo.id}` },
    ]);
  } finally {
    await unlink(filePath);
  }

  await next();
};

export default fileUploadMiddleware;
