import type { Book } from "../../entities/books.js";
import type { IBook } from "../../reposiories/IBookRepository.js";

export class createBooksUseCase{
    constructor(
        private readonly repository: IBook
    ){}

    async execute(book: Book): Promise<Book | null>{
        return this.repository.createBook(book)
    }
}