import express from 'express'
import router from './routers';
import { globalErrorHandler } from './middlewares/error.middleware';


const app = express()

app.use(express.json());
app.use("/api", router)

app.use(globalErrorHandler);

export default app;
