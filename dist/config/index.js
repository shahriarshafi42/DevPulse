import dotenv from "dotenv";
import path from "path";
dotenv.config({
    path: path.join(process.cwd(), ".env"),
});
const config = {
    connetion_string: process.env.CONNECTIONSTRING,
    port: process.env.PORT,
    secret: process.env.jwt_Secret,
};
export default config;
//# sourceMappingURL=index.js.map