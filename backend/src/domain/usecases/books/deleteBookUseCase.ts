import type { Book } from "../../entities/books.js";
import type { IBook } from "../../reposiories/IBookRepository.js";

export class deleteBooksUseCase{
    constructor(
        private readonly repository: IBook
    ){}

    async execute(id: string): Promise<boolean>{
        return this.repository.deleteBook(id)
    }
}