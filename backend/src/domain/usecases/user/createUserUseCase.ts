import { User } from "../../entities/user.js";
import type { IUserRepository } from "../../reposiories/IUserRepository.js";
import type { IHasher } from "../../services/hash.js";


export class createUserUseCase {
    constructor(
        private readonly repository: IUserRepository,
        private readonly hasher: IHasher
    ) { }

    async execute(user: User): Promise<User> {
        if (!user.username || !user.email) {
            throw new Error("UserName and email are required")
        }

        const hashedPassword =
            await this.hasher.hash(
                user.password
            )

        const newUser = new User({
            username: user.username,
            password: hashedPassword,
            email: user.email,
            birth: user.birth
        }
        )



        return this.repository.createUser(newUser)
    }
}