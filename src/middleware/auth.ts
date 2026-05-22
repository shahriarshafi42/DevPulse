import type { NextFunction, Request, Response } from "express";
import jwt, { type Jwt, type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
const auth = (...roles: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // console.log(roles);

    // console.log("thiss is proteced");
    try {
      const token = req.headers.authorization;
      if (!token) {
        res.status(401).json({
          success: false,
          message: "unauthorized access!!",
        });
      }
      const decoded = jwt.verify(
        token as string,
        config.secret as string,
      ) as JwtPayload;

      const userData = await pool.query(
        `
        
        SELECT * FROM users WHERE email=$1
        `,
        [decoded.email],
      );
      const user = userData.rows[0];
      console.log(user);

      if (userData.rows.length === 0) {
        res.status(401).json({
          success: false,
          message: "forbidden!!",
        });
      }
      if (roles.length && !roles.includes(user.role)) {
        res.status(401).json({
          success: false,
          message: "forbidden!!,you have no access!!",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
export default auth;
