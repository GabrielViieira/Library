import type { Request, Response } from "express";
import type { createBooksUseCase } from "../../domain/usecases/books/createtBookUseCase.js";
import type { deleteBooksUseCase } from "../../domain/usecases/books/deleteBookUseCase.js";
import type { findAllBooksUseCase } from "../../domain/usecases/books/findAllUseCase.js";
import type { findAuthorUseCase } from "../../domain/usecases/books/findAuthorUseCase.js";
import type { findCategoryUseCase } from "../../domain/usecases/books/findCategoryUseCase.js";
import type { updateBooksUseCase } from "../../domain/usecases/books/updateBookUseCase.js";

export class BooksController {
    constructor(
        private readonly findAllBooksUseCase: findAllBooksUseCase,
        private readonly findAuthorUseCase: findAuthorUseCase,
        private readonly findCategoryUseCase: findCategoryUseCase,
        private readonly createBooksUseCase: createBooksUseCase,
        private readonly updateBooksUseCase: updateBooksUseCase,
        private readonly deleteBooksUseCase: deleteBooksUseCase
    ) { }

    async search(req: Request, res: Response) {
        const { title, author, category } = req.query

        const book = await this.findAllBooksUseCase.execute(
            {
                title: title as string,
                author: author as string,
                category: category as string
            })

        return res.status(200).json(book)
    }

    async findAuthor(req: Request, res: Response) {
        const { name } = req.query

        if (typeof name !== "string") {
            return res.status(400).json({
                message: "Invalid Name."
            });
        }

        const author = await this.findAuthorUseCase.execute(name)

        return res.status(200).json(author)
    }

    async findCategory(req: Request, res: Response) {
        const { name } = req.query

        if (typeof name !== "string") {
            return res.status(400).json({
                message: "Invalid User."
            });
        }

        const category = await this.findCategoryUseCase.execute(name)

        if (!category || category.length === 0) {
            return res.status(404).json({
                message: "Categoria não encontrada"
            })
        }
        return res.status(200).json(category)
    }

    async createBook(req: Request, res: Response) {
        const book = req.body

        const createdBook = await this.createBooksUseCase.execute(book)

        return res.status(201).json(createdBook)
    }

    async updateBook(req: Request, res: Response) {
        const { id } = req.params
        const book = req.body

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Invalid User"
            })
        }

        const updatedBook = await this.updateBooksUseCase.execute(id, book)

        return res.status(200).json(updatedBook)
    }

    async deleteBook(req: Request, res: Response) {
        const { id } = req.params

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Invalid User"
            })
        }

        const deletedBook = await this.deleteBooksUseCase.execute(id)

        return res.status(200).json(deletedBook)
    }
}