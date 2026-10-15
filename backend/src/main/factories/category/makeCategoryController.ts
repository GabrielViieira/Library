import { createCategoryUseCase } from "../../../domain/usecases/category/createUseCase.js";
import { deleteCategoryUseCase } from "../../../domain/usecases/category/deleteUseCase.js";
import { findAllCategoryUseCase } from "../../../domain/usecases/category/findAllUseCase.js";
import { findByNameCategoryUseCase } from "../../../domain/usecases/category/findByNameUseCase.js";
import { updateCategoryUseCase } from "../../../domain/usecases/category/updateUseCase.js";
import { categoryRepository } from "../../../infrastructure/repositories/mongoCategoryRepo.js";
import { CategoryController } from "../../../presetention/controllers/categoryController.js";



export function makeCategoryController(){
    const repository = new categoryRepository()

    const FindAllCategoryUseCase = new findAllCategoryUseCase(repository)

    const FindByNameCategoryUseCase = new findByNameCategoryUseCase(repository)

    const CreateCategoryUseCase = new createCategoryUseCase(repository)

    const UpdateCategoryUseCase = new updateCategoryUseCase(repository)

    const DeleteCategoryUseCase = new deleteCategoryUseCase(repository)

    return new CategoryController(
        FindAllCategoryUseCase,
        FindByNameCategoryUseCase,
        CreateCategoryUseCase,
        UpdateCategoryUseCase,
        DeleteCategoryUseCase
    )
}