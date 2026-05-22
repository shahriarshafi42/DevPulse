import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { issueController } from "./issue.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../types";

const router = Router();




router.post("/",auth(USER_ROLE.contributor,USER_ROLE.maintainer,), issueController.createIssue);

router.get("/",auth(USER_ROLE.public), issueController.getallIssue);

router.get("/:id",auth(USER_ROLE.public), issueController.getSingleissue);

router.patch("/:id",auth(USER_ROLE.maintainer,USER_ROLE.contributor), issueController.updateissue);

router.delete("/:id",auth(USER_ROLE.maintainer),issueController.deletIsue );

export const issueRoute = router;
