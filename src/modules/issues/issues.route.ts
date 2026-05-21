import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { issueController } from "./issue.controller";

const router = Router();

router.post("/", issueController.createIssue);

export const issueRoute = router;
