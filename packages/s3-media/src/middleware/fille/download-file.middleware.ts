import Application, { DefaultState } from "koa";
import fs from "fs";
import uniqid from "uniqid";
import Context from "../../type/context";
import Token from "../../service/token";
import Uploader from "../../service/uploader";
import Downloader from "../../service/downloader";
import tmpPath from "../../service/tmp/tmpPath";
import pipeline from "../../service/stream/pipeline";
import FileKey from "../../type/file-key";
import Exchanger from "../../service/exchanger";

const downloadFileMiddleware: Application.Middleware<
  DefaultState,
  Context
> = async (context, next) => {
  const { styleId, fileId } = context.params;

  context.assert(styleId, 400, "style_id must not be undefined");
  context.assert(fileId, 400, "file_id must not be undefined");

  const currentKey = new FileKey(styleId, fileId);

  const downloader: Downloader = await context.resolve(Token.DOWNLOADER);
  const exchanger: Exchanger = await context.resolve(Token.EXCHANGER);

  const downloadUrl = await downloader.getDownloadUrl(currentKey);
  if (downloadUrl !== undefined) {
    context.redirect(downloadUrl);
    await next();
    return;
  }

  const originalKey = FileKey.fromOrigin(fileId);

  await exchanger.exchange(originalKey, currentKey);
  context.redirect(await downloader.fetchDownloadUrl(currentKey));

  await next();
};

export default downloadFileMiddleware;
