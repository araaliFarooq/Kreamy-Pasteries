import * as dotenv from 'dotenv';
dotenv.config();

const configurations = Object.freeze({
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
});

export default configurations;
