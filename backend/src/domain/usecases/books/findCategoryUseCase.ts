import type { Book } from "../../entities/books.js";
import type { IBook } from "../../reposiories/IBookRepository.js";

export class findCategoryUseCase{
    constructor(
        private readonly repository: IBook
    ){}

    async execute(category: string): Promise<Book[] | null>{
        return this.repository.findCategory(category)
    }
}