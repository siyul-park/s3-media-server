import Router from "koa-router";
import Context from "../type/context";
import fileUploadMiddleware from "../middleware/fille/file-upload.middleware";

const router = new Router<never, Context>();

router.prefix("/files");

router.post("/upload", fileUploadMiddleware);

export default router;
