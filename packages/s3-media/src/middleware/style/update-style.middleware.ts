import Application, { DefaultState } from "koa";
import Context from "../../type/context";
import JsonRepository from "../../s3/json-repository";
import Style from "../../type/style";
import Token from "../../service/token";

const updateStyleMiddleware: Application.Middleware<
  DefaultState,
  Context
> = async (context, next) => {
  const { styleId } = context.params;
  const style: Partial<Style> = context.request.body;

  context.assert(styleId, 400, "style_id must not be undefined");

  const styleRepository: JsonRepository<Style> = await context.resolve(
    Token.STYLE_REPOSITORY
  );

  context.body = await styleRepository.update({ ...style, id: styleId });

  await next();
};

export default updateStyleMiddleware;
