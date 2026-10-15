import type { IUserRepository } from "../../reposiories/IUserRepository.js";
import type { IHasher } from "../../services/hash.js";
import type { ITokenService } from "../../services/tokenService.js";

export class loginUseCase {
    constructor(
        private readonly repository: IUserRepository,
        private readonly hasher: IHasher,
        private readonly tokenService: ITokenService
    ) { }

    async execute(
        email: string,
        password: string
    ) {
        const user =
            await this.repository.findByEmail(email)
        if (!user) {
            throw new Error("User not found!")
        }

        const isValidPassword =
            await this.hasher.compare(
                password,
                user.password
            )

        if (!isValidPassword) {
            throw new Error("Wrong password")
        }

        const token =
            this.tokenService.generateToken({
                id: user.id,
                role: user.role
            })

        return {
            user: user.toResponse(),
            token
        }
    }
}