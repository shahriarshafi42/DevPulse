import type { Request, Response } from "express";
import { pool } from "../../db";
import { issueservice } from "./issue.service";


const createIssue = async (req: Request, res: Response) => {
  console.log(req.body);
  const { title, description, type, status, reporter_id } = req.body;
  try {
    
    const result = await issueservice.createIssueFromDB(req.body)
    console.log(result);

    res.status(201).json({
      success: true,
      message: "issues craeted successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      succes: false,
      message: error.message,
      data: error,
    });
  }
}

export const issueController={
    createIssue,
}