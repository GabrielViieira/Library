import type { Request, Response } from "express";
import type { createAuthorsUseCase } from "../../domain/usecases/authors/createUseCase.js";
import type { deleteAuthorsUseCase } from "../../domain/usecases/authors/deleteUseCase.js";
import type { findAllAuthorsUseCase } from "../../domain/usecases/authors/findAllUseCase.js";
import type { findByNameAuthorsUseCase } from "../../domain/usecases/authors/findByNameUseCase.js";
import type { updateAuthorsUseCase } from "../../domain/usecases/authors/updateUseCase.js";




export class AuthorsController {
    constructor(
        private readonly findAllAuthorsUseCase: findAllAuthorsUseCase,
        private readonly findByNameAuthorsUseCase: findByNameAuthorsUseCase,
        private readonly createAuthorsUseCase: createAuthorsUseCase,
        private readonly updateAuthorsUseCase: updateAuthorsUseCase,
        private readonly deleteAuthorsUseCase: deleteAuthorsUseCase,
    ) { }

    async findAll(req: Request, res: Response) {
        const authors = await this.findAllAuthorsUseCase.execute()

        if (!authors) throw new Error("Empty")

        res.status(200).json(authors)
    }

    async findByName(req: Request, res: Response) {
        const { author } = req.query

        if (typeof author !== "string") {
            return res.status(400).json({
                message: "Nome inválido."
            });
        }

        const query = await this.findByNameAuthorsUseCase.execute(author)

        res.status(200).json(query)
    }

    async createAuthor(req: Request, res: Response) {
        const author = req.body

        const createdAuthor = await this.createAuthorsUseCase.execute(author)

        res.status(201).json(createdAuthor)
    }

    async updateAuthor(req: Request, res: Response) {
        const { id } = req.params
        const author = req.body

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Invalid User"
            })
        }

        const updatedAuthor = await this.updateAuthorsUseCase.execute(id, author)

        res.status(200).json(updatedAuthor)
    }

    async deleteAuthor(req: Request, res: Response) {
        const { id } = req.params

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Invalid User"
            })
        }

        const deletedAuthor = await this.deleteAuthorsUseCase.execute(id)

        res.status(200).json(deletedAuthor)
    }
}