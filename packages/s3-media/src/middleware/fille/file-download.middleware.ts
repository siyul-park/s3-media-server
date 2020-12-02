import Application, { DefaultState } from "koa";
import fs from "fs";
import Context from "../../type/context";
import Token from "../../service/token";
import Uploader from "../../service/uploader";
import Downloader from "../../service/downloader";
import tmpPath from "../../service/tmp/tmpPath";
import unlink from "../../service/fs/unlink";
import pipeline from "../../service/stream/pipeline";

const fileDownloadMiddleware: Application.Middleware<
  DefaultState,
  Context
> = async (context, next) => {
  const { styleId, fileId } = context.params;

  const downloader: Downloader = await context.resolve(Token.DOWNLOADER);
  const uploader: Uploader = await context.resolve(Token.UPLOADER);

  const downloadUrl = await downloader.getDownloadUrl(styleId, fileId);
  if (downloadUrl !== undefined) {
    context.redirect(downloadUrl);
    await next();
    return;
  }

  const readStream = await downloader.fetchReadStream("original", fileId);
  const filePath = await tmpPath();

  try {
    const stream = fs.createWriteStream(filePath);
    await pipeline([readStream, stream]);

    await uploader.upload(styleId, filePath, fileId);

    context.redirect(await downloader.fetchDownloadUrl(styleId, fileId));
  } finally {
    await unlink(filePath);
  }

  await next();
};

export default fileDownloadMiddleware;
