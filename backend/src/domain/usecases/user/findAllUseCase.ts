import type { User } from "../../entities/user.js";
import type { IUserRepository } from "../../reposiories/IUserRepository.js";



export class findAllUsersUseCase{
    constructor(
        private readonly repository: IUserRepository
    ){}

    async execute(): Promise<User[]>{
        return this.repository.findAll()
    }
}