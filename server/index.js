import config from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import ErrorHandler from './middleware/ErrorHandler.js';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 2900;

const app = express();
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.SECRET_KEY));
app.use('/api', router);

app.use(ErrorHandler);

const start = async () => {
  try {
    app.listen(PORT, () => console.log('Сервер запущен', PORT));
  } catch (e) {
    console.log(e);
  }
};

start();
