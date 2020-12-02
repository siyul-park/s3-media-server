import Router from "koa-router";
import Context from "../type/context";

import fileRouter from "./file.router";

const router = new Router<never, Context>();

router.use(fileRouter.routes());

export default router;
