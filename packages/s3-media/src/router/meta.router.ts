import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import {
  camelCase,
  requestBody,
  responseBody,
  snakeCase,
} from "koa-change-case";

import Context from "../type/context";
import getFileInfoMiddleware from "../middleware/fille/get-file-info.middleware";

const router = new Router<never, Context>();

router.prefix("/metas");

router.use(bodyParser(), camelCase(requestBody));

router.get("/:styleId/:fileId", getFileInfoMiddleware);

router.use(snakeCase(responseBody));

export default router;
