import type { Book } from "../../entities/books.js";
import type { IBook } from "../../reposiories/IBookRepository.js";

export class findAuthorUseCase{
    constructor(
        private readonly repository: IBook
    ){}

    async execute(author: string): Promise<Book[] | null>{
        return this.repository.findAuthor(author)
    }
}