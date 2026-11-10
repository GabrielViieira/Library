import type { Book } from "../../entities/books.js";
import type { IBook } from "../../reposiories/IBookRepository.js";

export class createBooksUseCase {
    constructor(
        private readonly repository: IBook
    ) { }

    async execute(book: Book | Book[]): Promise<Book | Book[]> {
        if (Array.isArray(book)) {
            return this.repository.createMany(book);
        }

        return this.repository.createBook(book);
    }
}