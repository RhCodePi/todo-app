import { Router } from "express";
import *as dotenv from "dotenv";
import { createProxyMiddleware, RequestHandler } from "http-proxy-middleware";

dotenv.config();

const router = Router();

const pathFilter = function (path: string) {
  return path.match(process.env.PATHFILTER_REGEX)?.[0];
};

const filterdPath = pathFilter(process.env.PATH);

const apiProxyAuth = createProxyMiddleware({
  target: 'http://localhost:3005/api',
  pathFilter: filterdPath
});

router.use(apiProxyAuth);

export default router;
