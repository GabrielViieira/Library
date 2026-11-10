import type { Category } from "../../entities/categories.js";
import type { ICategory } from "../../reposiories/ICategoryRepository.js";


export class createCategoryUseCase {
    constructor(
        private readonly repository: ICategory
    ) { }

    async execute(category: Category | Category[]): Promise<Category | Category[]> {
        if (Array.isArray(category)) {
            return await this.repository.createMany(category)
        }
        return await this.repository.createCategory(category)
    }
}