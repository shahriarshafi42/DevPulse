import { pool } from "../../db";
import type { Iissues } from "./issues.interface";

const createIssueFromDB = async(payload: Iissues)=>{
    const{title, description, type,status,reporter_id}= payload

    const result = await pool.query(
      `   INSERT INTO issues(title, description, type,status,reporter_id) VALUES ($1,$2,$3,$4,$5)
    RETURNING *
    `,
      [title, description, type, status, reporter_id],
    );
    return result
}

export const  issueservice ={
    createIssueFromDB,
}