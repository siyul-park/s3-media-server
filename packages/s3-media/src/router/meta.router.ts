import Router from "koa-router";

import Context from "../type/context";
import getFileInfoMiddleware from "../middleware/fille/get-file-info.middleware";

const router = new Router<never, Context>();

router.prefix("/metas");

router.get("/:styleId/:fileId", getFileInfoMiddleware);

export default router;
