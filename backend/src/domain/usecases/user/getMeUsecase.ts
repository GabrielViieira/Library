import type { IUserRepository } from "../../reposiories/IUserRepository.js";

export class GetMeUseCase {
    constructor(
        private readonly repository: IUserRepository
    ) { }

    async execute(id: string) {
        const user = await this.repository.findById(id)

        if (!user) {
            throw new Error("User not found!")
        }

        return user.toResponse()
    }
}