import type { Category } from "../../entities/categories.js";
import type { ICategory } from "../../reposiories/ICategoryRepository.js";


export class updateCategoryUseCase{
    constructor(
        private readonly repository: ICategory
    ){}

    async execute(id: string, type: string):Promise<Category>{
        return await this.repository.updateCategory(id, type)
    }
}