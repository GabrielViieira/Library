import { Router } from "express";
import { makeAuthorController } from "../factories/author/makeAuthorController.js";
import { authMiddleware } from "../../presetention/middlewares/AuthMiddleware.js";
import { adminMiddleware } from "../../presetention/middlewares/adminMiddleware.js";




const router = Router()

const authorController = makeAuthorController()

router.get(
    "/list",
    authorController.findAll.bind(authorController)
)

router.get(
    "/search",
    authorController.findByName.bind(authorController)
)

router.post(
    "/create",
    authMiddleware,
    adminMiddleware,
    authorController.createAuthor.bind(authorController)
)

router.put(
    "/edit/:id",
    authMiddleware,
    adminMiddleware,
    authorController.updateAuthor.bind(authorController)
)

router.delete(
    "/delete/:id",
    authMiddleware,
    adminMiddleware,
    authorController.deleteAuthor.bind(authorController)
)

export {router as authorRoute}