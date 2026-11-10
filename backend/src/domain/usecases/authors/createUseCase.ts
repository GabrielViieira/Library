import type { Authors } from "../../entities/authors.js";
import type { IAuthors } from "../../reposiories/IAuthorsRepository.js";

export class createAuthorsUseCase{
    constructor(
        private readonly repository: IAuthors
    ){}

    async execute(author: Authors | Authors []): Promise<Authors>{
        if (Array.isArray(author)) {
        return await this.repository.createMany(author);
    }

    return await this.repository.createAuthor(author);
    }
}

