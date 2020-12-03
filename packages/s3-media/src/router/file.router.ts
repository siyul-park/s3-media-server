import Router from "koa-router";
import Context from "../type/context";
import uploadFileMiddleware from "../middleware/fille/upload-file.middleware";

const router = new Router<never, Context>();

router.prefix("/files");

router.post("/upload", uploadFileMiddleware);

export default router;
