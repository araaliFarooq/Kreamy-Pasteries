import config from './config/index.js';
import dbConnect from './database/index.js';
import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
// const dbConnect = require('./database');
const app = express();

const PORT = config.PORT;

dbConnect();
app.use('/', (req, res) => {
  res.send('Welcome to the beginnng on nothingness');
});
app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
