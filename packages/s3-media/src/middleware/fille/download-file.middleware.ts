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

const downloadFileMiddleware: Application.Middleware<
  DefaultState,
  Context
> = async (context, next) => {
  const { styleId, fileId } = context.params;

  context.assert(styleId, 400, "style_id must not be undefined");
  context.assert(fileId, 400, "file_id must not be undefined");

  const currentKey = new FileKey(styleId, fileId);

  const downloader: Downloader = await context.resolve(Token.DOWNLOADER);
  const uploader: Uploader = await context.resolve(Token.UPLOADER);

  const downloadUrl = await downloader.getDownloadUrl(currentKey);
  if (downloadUrl !== undefined) {
    context.redirect(downloadUrl);
    await next();
    return;
  }

  const originalKey = FileKey.fromOrigin(fileId);
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

export default downloadFileMiddleware;
