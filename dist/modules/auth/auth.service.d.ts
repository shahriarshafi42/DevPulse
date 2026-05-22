export declare const authService: {
    loginUserINtoDB: (payload: {
        email: string;
        password: string;
    }) => Promise<{
        token: string;
        users: {
            id: any;
            name: any;
            email: any;
            role: any;
            updated_at: any;
            created_at: any;
        };
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map