import 'dotenv/config';
import express from "express";
import router from "./routes/UserRouter.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}))


app.use(express.json());
app.use(cookieParser())




app.use(router);

export default app;

