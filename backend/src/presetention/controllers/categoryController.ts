import type { Request, Response } from "express";
import type { findAllCategoryUseCase } from "../../domain/usecases/category/findAllUseCase.js";
import type { findByNameCategoryUseCase } from "../../domain/usecases/category/findByNameUseCase.js";
import type { createCategoryUseCase } from "../../domain/usecases/category/createUseCase.js";
import type { updateCategoryUseCase } from "../../domain/usecases/category/updateUseCase.js";
import type { deleteCategoryUseCase } from "../../domain/usecases/category/deleteUseCase.js";





export class CategoryController {
    constructor(
        private readonly findAllCategoryUseCase: findAllCategoryUseCase,
        private readonly findByNameCategoryUseCase: findByNameCategoryUseCase,
        private readonly createCategoryUseCase: createCategoryUseCase,
        private readonly updateCategoryUseCase: updateCategoryUseCase,
        private readonly deleteCategoryUseCase: deleteCategoryUseCase,
    ) { }

    async findAll(req: Request, res: Response) {
        const category = await this.findAllCategoryUseCase.execute()

        if (!category) throw new Error("Empty")

        res.status(200).json(category)
    }

    async findByName(req: Request, res: Response) {
        const { category } = req.query

        if (typeof category !== "string") {
            throw new Error("Invalid category.")
        }
        
        const result = await this.findByNameCategoryUseCase.execute(category)

        res.status(200).json(result)
    }

    async createCategory(req: Request, res: Response) {
        const category = req.body

        const createdCategory = await this.createCategoryUseCase.execute(category)

        res.status(201).json(createdCategory)
    }

    async updateCategory(req: Request, res: Response) {
        const { id } = req.params
        const category = req.body

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Invalid User"
            })
        }

        const updatedCategory = await this.updateCategoryUseCase.execute(id, category)

        res.status(200).json(updatedCategory)
    }

    async deleteCategory(req: Request, res: Response) {
        const { id } = req.params

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Invalid User"
            })
        }

        const deletedCategory = await this.deleteCategoryUseCase.execute(id)

        res.status(200).json(deletedCategory)
    }
}