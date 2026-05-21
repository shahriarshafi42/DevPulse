import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
import config from "./config";
import { initDB, pool } from "./db";
import { issueRoute } from "./modules/issues/issues.route";
import { userRoute } from "./modules/user/user.route";
const app: Application = express();
const port = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "express server",
  });
});


//user
app.use("/api/auth/signup", userRoute)
// issuues

app.use("/api/issues", issueRoute)






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
      [id],
    );
    if (result.rows.length === 0) {
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

app.patch("/api/issues/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, type } = req.body;
  try {
    const result = await pool.query(
      `
  UPDATE issues 
  SET 
  title=COALESCE($1,title),
  description=COALESCE($2,description),
  type=COALESCE($3,type)  
  WHERE id=$4 RETURNING *  
  `,
      [title, description, type, id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "issues not found",
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: "Issue updated successfully",
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

app.delete("/api/issues/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
  DELETE FROM issues WHERE id =$1
  `,
      [id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "issues not found",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: {},
    });
  }
});

export default app;
