import Router from "koa-router";

import Context from "../type/context";
import downloadFileMiddleware from "../middleware/fille/download-file.middleware";

const router = new Router<never, Context>();

router.prefix("/bins");

router.get("/:styleId/:fileId", downloadFileMiddleware);

export default router;
