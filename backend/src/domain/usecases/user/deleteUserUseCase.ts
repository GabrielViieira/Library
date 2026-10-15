import type { IUserRepository } from "../../reposiories/IUserRepository.js";



export class deleteUserUseCase {
    constructor(
        private readonly repository: IUserRepository
    ) { }

    async execute(id: string): Promise<boolean> {
        const deletedUser = await this.repository.deleteUser(id)
        if (!deletedUser) {
            throw new Error("User not found.");
        }
        return deletedUser
    }
}