import pg from "pg";
import { DB_CONFIG } from "./config.js";

const { Pool } = pg;

export const pool = new Pool({
    port: DB_CONFIG.port,
    host: DB_CONFIG.host,
    user: DB_CONFIG.user,
    password: DB_CONFIG.password,
    database: DB_CONFIG.database,
});


pool.on("connect", () => {
    console.log("Database connected");
});

pool.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
});
