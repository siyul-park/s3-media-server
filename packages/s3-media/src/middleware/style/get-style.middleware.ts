import Application, { DefaultState } from "koa";
import Context from "../../type/context";
import JsonRepository from "../../s3/json-repository";
import Style from "../../type/style";
import Token from "../../service/token";

const getStyleMiddleware: Application.Middleware<
  DefaultState,
  Context
> = async (context, next) => {
  const { styleId } = context.params;

  context.assert(styleId, 400, "style_id must not be undefined");

  const styleRepository: JsonRepository<Style> = await context.resolve(
    Token.STYLE_REPOSITORY
  );

  context.body = await styleRepository.fetch(styleId);

  await next();
};

export default getStyleMiddleware;
