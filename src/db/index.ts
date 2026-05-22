import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.connetion_string,
});
export const initDB = async () => {
  try {
    await pool.query(`
     CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(45),
      email VARCHAR(100) NOT NULL ,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);
    await pool.query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'contributor'
    CHECK (role IN ('contributor', 'maintainer'));
`);

    await pool.query(`
          CREATE TABLE IF NOT EXISTS issues(
          id SERIAL PRIMARY KEY,
          reporter_id INT REFERENCES users(id)  ON DELETE CASCADE,
          
          title VARCHAR(255) NOT NULL,
          description TEXT,
          type VARCHAR(50),
          status VARCHAR(30) DEFAULT 'open',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP	
          )
          `);

    console.log("database connected succesfully");
  } catch (error) {
    console.log(error);
  }
};
