import { authService } from "./auth.service";
const loginUser = async (req, res) => {
    try {
        const result = await authService.loginUserINtoDB(req.body);
        res.status(201).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            data: error,
        });
    }
};
export const authController = {
    loginUser,
};
//# sourceMappingURL=auth.controller.js.map