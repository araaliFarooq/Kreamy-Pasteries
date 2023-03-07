import config from './config/index.js';
import dbConnect from './database/index.js';
import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoutes.js';
dotenv.config();

const app = express();
const prefix = '/api/v1';

const PORT = config.PORT;

dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', (req, res) => {
  res.send('Welcome to the beginnng on nothingness');
});
app.use(`${prefix}/user`, userRouter);
app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
