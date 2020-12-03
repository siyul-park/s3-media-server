import Application, { DefaultState } from "koa";
import fs from "fs";
import uniqid from "uniqid";

import Context from "../../type/context";
import Uploader from "../../service/uploader";
import Token from "../../service/token";
import tmpPath from "../../service/tmp/tmpPath";
import pipeline from "../../service/stream/pipeline";
import unlink from "../../service/fs/unlink";
import convertInfoToRelational from "../../service/converter/convert-info-to-relational";
import FileKey from "../../type/file-key";
import JsonRepository from "../../s3/json-repository";
import Style from "../../type/style";
import createFileLinks from "../../service/create-file-links";

const uploadFileMiddleware: Application.Middleware<
  DefaultState,
  Context
> = async (context, next) => {
  const uploader: Uploader = await context.resolve(Token.UPLOADER);
  const styleRepository: JsonRepository<Style> = await context.resolve(
    Token.STYLE_REPOSITORY
  );

  const filePath = await tmpPath();
  try {
    const stream = fs.createWriteStream(filePath);
    await pipeline([context.req, stream]);

    const originalKey = FileKey.fromOrigin(uniqid());

    const fileInfo = await uploader.upload(originalKey, filePath);
    const styles = await styleRepository.findAllIds();

    context.body = convertInfoToRelational(
      fileInfo,
      createFileLinks(styles, fileInfo.id)
    );
  } finally {
    await unlink(filePath);
  }

  await next();
};

export default uploadFileMiddleware;
