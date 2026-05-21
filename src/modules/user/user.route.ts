import { Router, type Request, type Response } from "express";
import { pool } from "../../db";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
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




export const userRoute = router;