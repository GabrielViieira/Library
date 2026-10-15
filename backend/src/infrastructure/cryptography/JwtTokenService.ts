import jwt from "jsonwebtoken";
import type { ITokenService } from "../../domain/services/tokenService.js";
import type { ITokenPayload } from "../../shared/types/payload.js";

export class JwtTokenService
    implements ITokenService {

    generateToken(payload: ITokenPayload): string {
        return jwt.sign(
            payload,
            process.env.JWT_TOKEN!,
            {
                expiresIn: "7d"
            }
        )
    }

    verifyToken(token: string): ITokenPayload  {
        return jwt.verify(
            token,
            process.env.JWT_TOKEN!
        ) as ITokenPayload
    }
}