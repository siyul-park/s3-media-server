import Application, { DefaultState } from "koa";
import Context from "../../type/context";
import JsonRepository from "../../s3/json-repository";
import Style from "../../service/style/style";
import Token from "../../service/token";

const getStylesMiddleware: Application.Middleware<
  DefaultState,
  Context
> = async (context, next) => {
  const styleRepository: JsonRepository<Style> = await context.resolve(
    Token.STYLE_REPOSITORY
  );

  context.body = await styleRepository.findAll();

  await next();
};

export default getStylesMiddleware;
