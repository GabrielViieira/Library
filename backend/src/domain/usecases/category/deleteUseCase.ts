import type { Category } from "../../entities/categories.js";
import type { ICategory } from "../../reposiories/ICategoryRepository.js";


export class deleteCategoryUseCase{
    constructor(
        private readonly repository: ICategory
    ){}

    async execute(id: string):Promise<boolean>{
        return await this.repository.deleteCategory(id)
    }
}