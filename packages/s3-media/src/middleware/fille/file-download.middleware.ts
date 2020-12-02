import Application, { DefaultState } from "koa";
import fs from "fs";
import Context from "../../type/context";
import Token from "../../service/token";
import Uploader from "../../service/uploader";
import Downloader from "../../service/downloader";
import tmpPath from "../../service/tmp/tmpPath";
import unlink from "../../service/fs/unlink";
import pipeline from "../../service/stream/pipeline";
import FileKey from "../../type/file-key";

const fileDownloadMiddleware: Application.Middleware<
  DefaultState,
  Context
> = async (context, next) => {
  const { styleId, fileId } = context.params;

  const currentKey = new FileKey(styleId, fileId);

  const downloader: Downloader = await context.resolve(Token.DOWNLOADER);
  const uploader: Uploader = await context.resolve(Token.UPLOADER);

  const downloadUrl = await downloader.getDownloadUrl(currentKey);
  if (downloadUrl !== undefined) {
    context.redirect(downloadUrl);
    await next();
    return;
  }

  const originalKey = new FileKey("original", fileId);
  const readStream = await downloader.fetchReadStream(originalKey);
  const filePath = await tmpPath();

  try {
    const stream = fs.createWriteStream(filePath);
    await pipeline([readStream, stream]);

    await uploader.upload(currentKey, filePath);

    context.redirect(await downloader.fetchDownloadUrl(currentKey));
  } finally {
    await unlink(filePath);
  }

  await next();
};

export default fileDownloadMiddleware;
