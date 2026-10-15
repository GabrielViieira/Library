import type { Authors } from "../../entities/authors.js";
import type { IAuthors } from "../../reposiories/IAuthorsRepository.js";

export class createAuthorsUseCase{
    constructor(
        private readonly repository: IAuthors
    ){}

    async execute(author: Authors): Promise<Authors>{
        return this.repository.createAuthor(author)
    }
}