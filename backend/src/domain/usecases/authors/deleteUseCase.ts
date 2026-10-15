import type { Authors } from "../../entities/authors.js";
import type { IAuthors } from "../../reposiories/IAuthorsRepository.js";

export class deleteAuthorsUseCase{
    constructor(
        private readonly repository: IAuthors
    ){}

    async execute(id: string): Promise<boolean>{
        return this.repository.deleteAuthor(id)
    }
}