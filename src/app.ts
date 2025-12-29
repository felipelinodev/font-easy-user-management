import express from "express";
import router from "./routes/UserRouter.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.set('trust proxy', 1);


app.use(express.json());
app.use(cookieParser())


app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}))

app.use(router);

export default app;

