import 'dotenv/config';
import express from "express";
import router from "./routes/UserRouter.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

const origin = process.env.FRONTEND_URL ? process.env.FRONTEND_URL : true;

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: origin,
  credentials: true,
}))




app.use(router);

if (process.env.VERCEL !== '1') {
  app.listen(5000, () => {
    console.log('Aplicação rodando em porta: 5000');
  });
}

export default app;

