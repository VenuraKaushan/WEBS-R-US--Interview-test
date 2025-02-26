import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Check DB Connection
pool 
  .connect()
  .then((client) => {
    console.log("✅ Database Connected Successfully!");
    client.release(); 
  })
  .catch((err) => console.error("❌ Database Connection Error:", err.stack));

export default pool;
