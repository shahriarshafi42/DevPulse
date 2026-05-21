import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { issueController } from "./issue.controller";

const router = Router();

router.post("/", issueController.createIssue);

router.get("/", issueController.getallIssue);

router.get("/:id", issueController.getSingleissue);

router.patch("/:id", issueController.updateissue);

router.delete("/:id",issueController.deletIsue );

export const issueRoute = router;
