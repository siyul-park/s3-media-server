import Router from "koa-router";
import Context from "../type/context";

import pingPongRouter from "./ping-pong.router";
import fileRouter from "./file.router";
import styleRouter from "./style.router";
import binRouter from "./bin.router";
import metaRouter from "./meta.router";

const router = new Router<never, Context>();

router.use(pingPongRouter.routes());
router.use(fileRouter.routes());
router.use(styleRouter.routes());
router.use(binRouter.routes());
router.use(metaRouter.routes());

export default router;
