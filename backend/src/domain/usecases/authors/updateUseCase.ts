import type { Authors } from "../../entities/authors.js";
import type { IAuthors } from "../../reposiories/IAuthorsRepository.js";

export class updateAuthorsUseCase{
    constructor(
        private readonly repository: IAuthors
    ){}

    async execute(id: string, author: Authors): Promise<Authors | null>{
        return this.repository.updateAuthor(id, author)
    }
}