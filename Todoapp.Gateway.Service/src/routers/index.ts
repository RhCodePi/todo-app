import { Router } from "express";
import *as dotenv from "dotenv";
import { createProxyMiddleware} from "http-proxy-middleware";
import { validToken } from "../middlewares/auth.middleware";

dotenv.config();

const router = Router();

const pathFilter = function (path: string, regex: string) {
  return path.match(regex)?.[0];
};

const filterdPath = pathFilter(process.env.AUTH_PATH, process.env.PATHFILTER_REGEX);
const todoFilteredPath = pathFilter(process.env.TODO_PATH, process.env.TODO_PATHFILTER_REGEX)

const apiProxyAuth = createProxyMiddleware({
  target: process.env.TARGET,
  pathFilter: filterdPath,
});

const todoApiProxy = createProxyMiddleware({
  target: process.env.TODO_TARGET,
  pathFilter: todoFilteredPath
})

router.use(apiProxyAuth);
router.use(validToken, todoApiProxy);

export default router;
