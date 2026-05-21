import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
const app: Application = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_PY9GXy6jeMwF@ep-twilight-king-aq9piy79-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});
const initDB = async () => {
  try {
    await pool.query(`
     CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(45),
      email VARCHAR(100) NOT NULL UNIQUE,
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
initDB();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "express server",
  });
});
//user
app.post("/api/auth/signup", async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  try {
    const result = await pool.query(
      `   INSERT INTO users(name, email,password) VALUES ($1,$2,$3)
    RETURNING *
    `,
      [name, email, password],
    );
    console.log(result);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      data: error,
    });
  }
});
// issuues
app.post("/api/issues", async (req: Request, res: Response) => {
  console.log(req.body);
  const { title, description, type, status, reporter_id } = req.body;
  try {
    const result = await pool.query(
      `   INSERT INTO issues(title, description, type,status,reporter_id) VALUES ($1,$2,$3,$4,$5)
    RETURNING *
    `,
      [title, description, type, status, reporter_id],
    );
    console.log(result);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      succes: false,
      message: error.message,
      data: error,
    });
  }
});

app.get("/api/issues", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
    SELECT * FROM issues
    `);
    res.status(200).json({
      success: true,
      message: "Retrieve all issues successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      succes: false,
      message: error.message,
      data: error,
    });
  }
});

app.get("/api/issues/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log("id:", id);

  try {
    const result = await pool.query(
      `
      SELECT * FROM issues WHERE id = $1
      `,
      [id]
    );
    if (result.rows.length ===0) {
      res.status(404).json({
      success: false,
      message: "issues not found",
      data: {},
    });
    }

    res.status(200).json({
      success: true,
      message: "Retrieve single issue successfully",
      data: result.rows[0],
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
