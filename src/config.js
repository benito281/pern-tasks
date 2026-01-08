import dotenv from "dotenv";
dotenv.config();

export const DB_CONFIG = {
  port: process.env.PORT,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

export const SERVER_PORT = process.env.PORT_SERVER || 3000;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET