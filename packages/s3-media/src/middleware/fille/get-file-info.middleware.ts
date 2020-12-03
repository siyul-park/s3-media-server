import Application, { DefaultState } from "koa";

import Context from "../../type/context";
import Token from "../../service/token";
import FileKey from "../../type/file-key";
import FileInfoRepository from "../../service/file-info-repository";

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

  context.body = await fileInfoRepository.fetchById(currentKey);

  await next();
};

export default getFileInfoMiddleware;
