import type { Request, Response } from "express";
import { pool } from "../../db";
import { issueservice } from "./issue.service";

const createIssue = async (req: Request, res: Response) => {
  console.log(req.body);
  const { title, description, type, status, reporter_id } = req.body;
  try {
    const result = await issueservice.createIssueFromDB(req.body);
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
};

const getallIssue = async (req: Request, res: Response) => {
  try {
    const result = await issueservice.getallIssuefromDB();
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
};

const getSingleissue = async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log("id:", id);

  try {
    const result = await issueservice.getSingleissueFromdDB(id as string);

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
};

const updateissue = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, type } = req.body;
  try {
    const result = await issueservice.updateIsuueFromDB(req.body, id as string);

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
};

const deletIsue = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await issueservice.deletIsueFromDB(id as string);

    if (result.rowCount === 0) {
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
};

export const issueController = {
  createIssue,
  getallIssue,
  getSingleissue,
  updateissue,
  deletIsue,
};
