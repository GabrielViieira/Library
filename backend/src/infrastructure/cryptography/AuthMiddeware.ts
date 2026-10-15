import type { Request, Response, NextFunction } from "express";
import type { JwtTokenService } from "./JwtTokenService.js";


export class AuthMiddleware {
    constructor(private tokenService: JwtTokenService) { }

    handle = (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization
        if (!authHeader) return res.status(401).json({ error: "Token missing" })

        const [, token] = authHeader.split(" ")

        try {
            const payload = this.tokenService.verifyToken(token!) as {
                id: string;
                role: ("user" | "admin")[];
            }

            req.user = { id: payload.id, role: payload.role}

            return next()
        } catch (error) {
            return res.status(401).json({ error: "Invalid token" })
        }
    }
}