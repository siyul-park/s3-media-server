import Router from "koa-router";

import Context from "../type/context";
import getStyleMiddleware from "../middleware/style/get-style.middleware";
import downloadFileMiddleware from "../middleware/fille/download-file.middleware";

const router = new Router<never, Context>();

router.prefix("/styles");

router.get("/:styleId", getStyleMiddleware);
router.get("/:styleId/:fileId", downloadFileMiddleware);

export default router;
