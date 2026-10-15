import { Authors } from "../../domain/entities/authors.js";
import type { IAuthors } from "../../domain/reposiories/IAuthorsRepository.js";
import { AuthorModel, type authorDocument } from "../database/models/authorsModel.js";


function toEntity(author: authorDocument): Authors {
    return new Authors(
        author._id.toString(),
        author.name,
        author.biography || ''
    )
}

export class AuthorRepository
    implements IAuthors {
    async findAll(): Promise<Authors[]> {
        const author = await AuthorModel.find()

        if (!author) throw new Error("Authors list is empty.")

        return author.map(toEntity)
    }

    async findByName(name: string): Promise<Authors[] | null> {
        const author = await AuthorModel.find({
            name: {
                $regex: name,
                $options: "i"
            }
        })

        if (!author) return null

        return author.map(toEntity)
    }

    async createAuthor(author: Authors): Promise<Authors> {
        const createdAuthor = await AuthorModel.create({
            name: author.name,
            biography: author.biography!
        })

        return toEntity(createdAuthor)
    }

    async updateAuthor(id: string, author: Authors): Promise<Authors | null> {
        const updatedAuthor = await AuthorModel.findByIdAndUpdate(id, author, { new: true })

        return toEntity(updatedAuthor!)
    }

    async deleteAuthor(id: string): Promise<boolean> {
        const deletedAuthor = await AuthorModel.findByIdAndDelete(id)
        return !!deletedAuthor
    }
}