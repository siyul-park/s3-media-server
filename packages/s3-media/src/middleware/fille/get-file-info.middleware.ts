import Application, { DefaultState } from "koa";

import Context from "../../type/context";
import Token from "../../service/token";
import FileKey from "../../type/file-key";
import FileInfoRepository from "../../service/file-info-repository";
import Downloader from "../../service/downloader";
import Exchanger from "../../service/exchanger";

const getFileInfoMiddleware: Application.Middleware<
  DefaultState,
  Context
> = async (context, next) => {
  const { styleId, fileId } = context.params;

  context.assert(styleId, 400, "style_id must not be undefined");
  context.assert(fileId, 400, "file_id must not be undefined");

  const currentKey = new FileKey(styleId, fileId);

  const fileInfoRepository: FileInfoRepository = await context.resolve(
    Token.FILE_INFO_REPOSITORY
  );
  const exchanger: Exchanger = await context.resolve(Token.EXCHANGER);

  const fileInfo = await fileInfoRepository.findById(currentKey);
  if (fileInfo !== undefined) {
    context.body = fileInfo;
    await next();
    return;
  }

  const originalKey = FileKey.fromOrigin(fileId);

  await exchanger.exchange(originalKey, currentKey);
  context.body = await fileInfoRepository.findById(currentKey);

  await next();
};

export default getFileInfoMiddleware;
