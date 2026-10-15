import type { User } from "../../entities/user.js";
import type { IUserRepository } from "../../reposiories/IUserRepository.js";



export class findByIdUseCase {
    constructor(
        private readonly repository: IUserRepository
    ) { }

    async execute(id: string): Promise<User | null> {
        if (!id) {
            console.error({ message: "Invalid Request!" })
            return null
        }
        return this.repository.findById(id)
    }
}