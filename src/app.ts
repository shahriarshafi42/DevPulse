import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
import config from "./config";
import { initDB, pool } from "./db";
import { issueRoute } from "./modules/issues/issues.route";
import { userRoute } from "./modules/user/user.route";
const app: Application = express();
const port = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "express server",
  });
});


//user
app.use("/api/auth/signup", userRoute)
// issuues

app.use("/api/issues", issueRoute)


export default app;
