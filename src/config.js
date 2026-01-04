import dotenv from "dotenv";
dotenv.config();

export const DB_CONFIG = {
  port: process.env.PORT || 5432,
  host: process.env.HOST || "localhost",
  user: process.env.USER || "postgres",
  password: process.env.PASSWORD || "Mileming20133",
  database: process.env.DATABASE || "tasksdb",
};
export const SERVER_PORT = process.env.PORT_SERVER || 3000;