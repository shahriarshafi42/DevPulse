import type { NextFunction, Request, Response } from "express";
declare const auth: (...roles: any) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default auth;
//# sourceMappingURL=auth.d.ts.map