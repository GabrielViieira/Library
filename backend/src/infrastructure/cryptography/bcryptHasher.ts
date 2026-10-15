import bcrypt from "bcrypt";
import type { IHasher } from "../../domain/services/hash.js";

export class BcryptHasher
    implements IHasher {

    async hash(
        value: string
    ): Promise<string> {
        return bcrypt.hash(value, 10)
    }

    async compare(
        value: string,
        hash: string
    ): Promise<boolean> {
        return bcrypt.compare(
            value,
            hash
        )
    }
}