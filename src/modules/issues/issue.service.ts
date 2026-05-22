import { pool } from "../../db";
import type { Iissues } from "./issues.interface";

const createIssueFromDB = async (payload: Iissues) => {
  const { title, description, type, status, reporter_id } = payload;
  //user

  const result = await pool.query(
    `   INSERT INTO issues(title, description, type,status,reporter_id) VALUES ($1,$2,$3,$4,$5)
    RETURNING *
    `,
    [title, description, type, status, reporter_id],
  );

  return result;
};

const getallIssuefromDB = async () => {
  const result = await pool.query(`
    SELECT * FROM issues
    `);
  return result;
};

const getSingleissueFromdDB = async (id: string) => {
  const result = await pool.query(
    `
      SELECT * FROM issues WHERE id = $1
      `,
    [id],
  );
  return result;
};

const updateIsuueFromDB = async (payload: Iissues, id: string) => {
  const { title, description, type } = payload;
  const result = await pool.query(
    `
  UPDATE issues 
  SET 
  title=COALESCE($1,title),
  description=COALESCE($2,description),
  type=COALESCE($3,type)  
  WHERE id=$4 RETURNING *  
  `,
    [title, description, type, id],
  );
  return result;
};

const deletIsueFromDB = async (id: string) => {
  const result = await pool.query(
    `
  DELETE FROM issues WHERE id =$1
   
  `,
    [id],
  );
  return result;
};

export const issueservice = {
  createIssueFromDB,
  getallIssuefromDB,
  getSingleissueFromdDB,
  updateIsuueFromDB,
  deletIsueFromDB,
};
