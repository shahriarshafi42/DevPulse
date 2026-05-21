import type { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  try {
    const result = await userService.creatUerDB(req.body);
    // console.log(result);

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
};

export const userController = {
  createUser,
};
