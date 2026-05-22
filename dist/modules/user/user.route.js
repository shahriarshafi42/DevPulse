import { Router } from "express";
import { pool } from "../../db";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../types";
const router = Router();
router.post("/", userController.createUser);
export const userRoute = router;
//# sourceMappingURL=user.route.js.map