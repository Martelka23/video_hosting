import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.router';
import errorMiddleware from './middlewares/error.middleware';
import usersRouter from './routes/users.router';

config({ path: './.env' });


const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

app.use(errorMiddleware);

async function start() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
  });
}

start();