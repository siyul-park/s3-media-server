import Router from "koa-router";
import Context from "../type/context";
import fileDownloadMiddleware from "../middleware/fille/file-download.middleware";

const router = new Router<never, Context>();

router.prefix("/styles");

router.get("/:styleId/:fileId", fileDownloadMiddleware);

export default router;
