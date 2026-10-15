import type { Category } from "../../entities/categories.js";
import type { ICategory } from "../../reposiories/ICategoryRepository.js";


export class findAllCategoryUseCase{
    constructor(
        private readonly repository: ICategory
    ){}

    async execute():Promise<Category[]>{
        return await this.repository.findAll()
    }
}