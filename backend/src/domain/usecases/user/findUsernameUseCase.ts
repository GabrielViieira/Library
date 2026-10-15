import type { User } from "../../entities/user.js";
import type { IUserRepository } from "../../reposiories/IUserRepository.js";



export class findUsername {
    constructor(
        private readonly repository: IUserRepository
    ) { }

    async execute(username: string): Promise<User | null> {
        if (!username) {
            console.error({ message: "Invalid Request!" })
            return null
        }
        return this.repository.findUsername(username)
    }
}