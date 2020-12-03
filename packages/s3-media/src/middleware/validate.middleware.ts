import Application, { DefaultState } from "koa";
import { AnySchema } from "joi";
import { Exchanger } from "koa-change-case";
import Context from "../type/context";

function validateMiddleware(
  schema: AnySchema,
  exchanger: Exchanger
): Application.Middleware<DefaultState, Context> {
  return async (context, next) => {
    try {
      const value = await exchanger.extract(context);
      await exchanger.inject(context, await schema.validateAsync(value));
    } catch (e) {
      context.throw(e.message, 400);
    }

    await next();
  };
}

export default validateMiddleware;
