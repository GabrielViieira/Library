import type { Category } from "../../entities/categories.js";
import type { IBook } from "../../reposiories/IBookRepository.js";
import type { ICategory } from "../../reposiories/ICategoryRepository.js";


export class findByNameCategoryUseCase{
    constructor(
        private readonly repository: ICategory,
    ){}

    async execute(categoryName: string){
        const categoryEntity = await this.repository.findByName(categoryName)

        return categoryEntity
    }
}