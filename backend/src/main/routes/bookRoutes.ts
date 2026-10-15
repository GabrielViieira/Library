import { Router } from "express";
import { makeBookController } from "../factories/books/makeBooksController.js";
import { authMiddleware } from "../../presetention/middlewares/AuthMiddleware.js";
import { adminMiddleware } from "../../presetention/middlewares/adminMiddleware.js";



const router = Router()

const BookController = makeBookController()

router.get(
    "/search",
    (req, res) => BookController.search(req, res)
)

router.get(
    "/author",
    BookController.findAuthor.bind(BookController)
)

router.get(
    "/catetgory",
    BookController.findCategory.bind(BookController)
)

router.post(
    "/create",
    authMiddleware,
    adminMiddleware,
    BookController.createBook.bind(BookController)
)

router.put(
    "/edit/:id",
    authMiddleware,
    adminMiddleware,
    BookController.updateBook.bind(BookController)
)

router.delete(
    "/delete/:id",
    authMiddleware,
    adminMiddleware,
    BookController.deleteBook.bind(BookController)
)

export { router as bookRoute }