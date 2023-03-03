import config from '../config/index.js';
import mongoose from 'mongoose';
const DB_URL = config.DATABASE_URL;

const dbConnect = () => {
  try {
    const connect_db = mongoose.connect(DB_URL);
    console.log('<< DB CONNECTION MADE >>');
  } catch (error) {
    console.log('Database Error: ', error);
  }
};

export default dbConnect;
