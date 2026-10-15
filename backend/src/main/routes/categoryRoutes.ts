import { Router } from "express";
import { makeCategoryController } from "../factories/category/makeCategoryController.js";
import { authMiddleware } from "../../presetention/middlewares/AuthMiddleware.js";
import { adminMiddleware } from "../../presetention/middlewares/adminMiddleware.js";






const router = Router()

const CategoryController = makeCategoryController()

router.get(
    "/list",
    CategoryController.findAll.bind(CategoryController)
)

router.get(
    "/search",
    CategoryController.findByName.bind(CategoryController)
)

router.post(
    "/create",
    authMiddleware,
    adminMiddleware,
    CategoryController.createCategory.bind(CategoryController)
)

router.put(
    "/edit/:id",
    authMiddleware,
    adminMiddleware,
    CategoryController.updateCategory.bind(CategoryController)
)

router.delete(
    "/delete/:id",
    authMiddleware,
    adminMiddleware,
    CategoryController.deleteCategory.bind(CategoryController)
)

export {router as CategoryRoute}