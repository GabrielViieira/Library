import { Category } from "../../domain/entities/categories.js";
import type { ICategory } from "../../domain/reposiories/ICategoryRepository.js";
import { CategoryModel, type CategoryDocument } from "../database/models/catergoryModel.js";


function toEntity(category: CategoryDocument): Category {
    return new Category(
        category.id,
        category.category
    )
}

export class categoryRepository
    implements ICategory {

    async findAll(): Promise<Category[]> {
        const category = await CategoryModel.find()

        return category.map(toEntity)
    }

    async findByName(category: string): Promise<Category> {
        const categories = await CategoryModel.findOne({ category })

        if (!categories) throw new Error(`${category} not found.`)

        return toEntity(categories)
    }

    async createCategory(category: Category): Promise<Category> {
        const createdCategory = await CategoryModel.create({
            category: category.category
        })

        return toEntity(createdCategory)
    }

    async updateCategory(id: string, type: string): Promise<Category> {
        const updatedCategory = await CategoryModel.findByIdAndUpdate(id, { type }, { new: true })

        return toEntity(updatedCategory!)
    }

    async deleteCategory(id: string): Promise<boolean> {
        const deletedCategory = await CategoryModel.findByIdAndDelete(id)

        return !!deletedCategory
    }
}