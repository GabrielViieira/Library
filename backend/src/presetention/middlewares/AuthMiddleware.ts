import type {
    Request,
    Response,
    NextFunction
} from "express";

import jwt from "jsonwebtoken";

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader =
        req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            message: "Missing Token"
        })
    }

    const [, token] =
        authHeader.split(" ")

    try {
        const payload = jwt.verify(
            token!,
            process.env.JWT_TOKEN!
        )
        
        req.user = payload as {
            id: string
            role: string
        }

        next()
    } catch {
        return res.status(401).json({
            message: "Missing Token"
        })
    }
}