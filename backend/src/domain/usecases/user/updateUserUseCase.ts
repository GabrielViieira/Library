import type { User } from "../../entities/user.js";
import type { IUserRepository } from "../../reposiories/IUserRepository.js";



export class updateUserUseCase {
    constructor(
        private readonly repository: IUserRepository
    ) { }

    async execute(id: string, user: User): Promise<User | null> {
        const updatedUser = await this.repository.updateUser(id, user)
        if (!updatedUser) {
            throw new Error("User not found.");
        }
        return updatedUser
    }
}