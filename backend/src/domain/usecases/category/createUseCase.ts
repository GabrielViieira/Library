import type { Category } from "../../entities/categories.js";
import type { ICategory } from "../../reposiories/ICategoryRepository.js";


export class createCategoryUseCase{
    constructor(
        private readonly repository: ICategory
    ){}

    async execute(category: Category):Promise<Category>{
        return await this.repository.createCategory(category)
    }
}