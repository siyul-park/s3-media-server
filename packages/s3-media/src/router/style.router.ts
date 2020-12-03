import Router from "koa-router";
import { requestBody } from "koa-change-case";
import bodyParser from "koa-bodyparser";

import Context from "../type/context";
import styleSchema from "../type/style.schema";
import getStylesMiddleware from "../middleware/style/get-styles.middleware";
import getStyleMiddleware from "../middleware/style/get-style.middleware";
import validateMiddleware from "../middleware/validate.middleware";
import createStyleMiddleware from "../middleware/style/create-style.middleware";
import upsertStyleMiddleware from "../middleware/style/upsert-style.middleware";

const router = new Router<never, Context>();

router.prefix("/styles");

router.use(bodyParser());

router.get("/", getStylesMiddleware);
router.post(
  "/",
  validateMiddleware(styleSchema, requestBody),
  createStyleMiddleware
);

router.get("/:styleId", getStyleMiddleware);
router.put(
  "/:styleId",
  validateMiddleware(styleSchema, requestBody),
  upsertStyleMiddleware
);

export default router;
