import config from '../config/index.js';
import mongoose from 'mongoose';
const DB_URL = config.DATABASE_URL;

// const dbConnect = () => {
//   try {
//     connect_db = mongoose.connect(DB_URL);
//     console.log('<< DB CONNECTION MADE >>');
//   } catch (error) {
//     console.log('Database Error: ', error);
//   }
// };

// export default connect_db;
const { DATABASE_URL } = config;

const mongoDb = () => mongoose.connect(DATABASE_URL, { useNewUrlParser: true });

export default mongoDb;
