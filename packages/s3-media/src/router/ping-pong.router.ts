import Router from "koa-router";

import Context from "../type/context";
import pingPongMiddleware from "../middleware/ping-pong.middleware";

const router = new Router<never, Context>();

router.prefix("/ping");

router.get("/", pingPongMiddleware);

export default router;
