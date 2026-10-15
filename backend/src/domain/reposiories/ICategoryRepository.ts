import { Category } from "../entities/categories.js";

export interface ICategory{
    findAll(): Promise<Category[]>
    findByName(type: string): Promise<Category>
    createCategory(category: Category):Promise<Category>
    updateCategory(id: string, type: string): Promise<Category>
    deleteCategory(id: string): Promise<boolean>
}