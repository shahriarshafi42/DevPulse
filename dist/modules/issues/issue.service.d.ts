import type { Iissues } from "./issues.interface";
export declare const issueservice: {
    createIssueFromDB: (payload: Iissues) => Promise<import("pg").QueryResult<any>>;
    getallIssuefromDB: () => Promise<import("pg").QueryResult<any>>;
    getSingleissueFromdDB: (id: string) => Promise<import("pg").QueryResult<any>>;
    updateIsuueFromDB: (payload: Iissues, id: string) => Promise<import("pg").QueryResult<any>>;
    deletIsueFromDB: (id: string) => Promise<import("pg").QueryResult<any>>;
};
//# sourceMappingURL=issue.service.d.ts.map