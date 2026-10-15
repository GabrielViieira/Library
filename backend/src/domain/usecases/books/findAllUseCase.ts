import type { Book } from "../../entities/books.js";
import type { IBook } from "../../reposiories/IBookRepository.js";

interface SearchBooksInput {
    title?: string
    author?: string
    category?: string
}
export class findAllBooksUseCase {
    constructor(
        private readonly repository: IBook
    ) { }

    async execute(input: SearchBooksInput): Promise<Book[] | null> {

        return await this.repository.search(input)
    }
}