import express from "express";
import router from "./routes/UserRouter.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser())

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}))

app.use(router);

export default app;

