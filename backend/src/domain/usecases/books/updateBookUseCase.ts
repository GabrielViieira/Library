import type { Book } from "../../entities/books.js";
import type { IBook } from "../../reposiories/IBookRepository.js";

export class updateBooksUseCase{
    constructor(
        private readonly repository: IBook
    ){}

    async execute(id: string, book: Book): Promise<Book | null>{
        return this.repository.updateBook(id, book)
    }
}