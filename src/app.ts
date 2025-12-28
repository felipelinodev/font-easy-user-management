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

app.listen(port, () => {
  console.log(`App rodando na porta: ${port}\n Acesse: http://localhost:5000
`);
});

