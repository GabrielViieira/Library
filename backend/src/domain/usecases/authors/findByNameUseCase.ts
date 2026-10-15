import type { Authors } from "../../entities/authors.js";
import type { IAuthors } from "../../reposiories/IAuthorsRepository.js";

export class findByNameAuthorsUseCase{
    constructor(
        private readonly repository: IAuthors
    ){}

    async execute(name: string): Promise<Authors | null>{
        return this.repository.findByName(name)
    }
}