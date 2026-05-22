import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUserINtoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;
  const userData = await pool.query(
    `
        SELECT * FROM users WHERE email=$1

        `,
    [email],
  );

  if (userData.rows.length === 0) {
    throw new Error("Invalid credentials!");
  }

  const user = userData.rows[0];
  const mathPassword = await bcrypt.compare(password, user.password);
  if (!mathPassword) {
    throw new Error("Invalid credentials!");
  }

  const jwtpauload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const users = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    updated_at: user.updated_at,
    created_at: user.created_at,
  };
  const token = jwt.sign(jwtpauload, config.secret as string, {
    expiresIn: "1d",
  });
  return { token, users };
};
export const authService = {
  loginUserINtoDB,
};
