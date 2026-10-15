import type { Authors } from "../../entities/authors.js";
import type { IAuthors } from "../../reposiories/IAuthorsRepository.js";

export class findAllAuthorsUseCase{
    constructor(
        private readonly repository: IAuthors
    ){}

    async execute(): Promise<Authors[]>{
        return this.repository.findAll()
    }
}