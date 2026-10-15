import type {
    Request,
    Response,
    NextFunction
} from "express";

export function adminMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.user?.role.includes("admin")) {
        return res.status(403).json({
            message: "Acesso negado"
        });
    }

    next();
}