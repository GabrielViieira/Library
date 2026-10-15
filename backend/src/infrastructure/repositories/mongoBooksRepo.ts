import type { Schema } from "mongoose";
import { Book as BookEntity } from "../../domain/entities/books.js";
import type { IBook } from "../../domain/reposiories/IBookRepository.js";
import { AuthorModel } from "../database/models/authorsModel.js";
import { BookModel, type BookDocument } from "../database/models/bookModel.js";
import { CategoryModel } from "../database/models/catergoryModel.js";

function toEntity(mongoDoc: BookDocument) {
    return new BookEntity(
        mongoDoc.title,
        mongoDoc.pages,
        mongoDoc.author.toString(),
        mongoDoc.categories.map(category => category.toString())
    )
}

export class BookRepository
    implements IBook {
    async search(filters?: { title?: string; author?: string; category?: string }): Promise<BookEntity[]> {

        const query: any = {}

        if (filters) {
            if (filters.title && filters.title !== 'undefined') {
                query.title = { $regex: filters.title, $options: 'i' }
            }
            if (filters.author && filters.author.trim() !== "") {
                const foundAuthor = await AuthorModel.findOne({
                    name: { $regex: filters.author.trim(), $options: 'i' }
                })

                if (foundAuthor) {
                    query.author = foundAuthor._id
                } else {
                    return []
                }
            }
            if (filters.category && filters.category !== 'undefined') {
                const foundCategory = await CategoryModel.findOne({
                    category: { $regex: filters.category, $options: 'i' }
                })

                if (foundCategory) {
                    query.categories = foundCategory._id;
                } else {

                    return []
                }
            }

        }

        const Book = await BookModel.find(query).populate("author").populate("categories").exec()

        return Book.map(book => toEntity(book))
    }

    async findAuthor(
        title: string
    ): Promise<BookEntity[]> {

        const books = await BookModel.find({
            author: {
                $regex: title,
                $options: "i"
            }
        });

        return books.map(toEntity);
    }

    async findCategory(title: string): Promise<BookEntity[] | null> {
        const Book = await BookModel.find({
            categories: {
                $regex: title,
                $options: "i"
            }
        })

        if (Book.length === 0) return null

        return Book.map(toEntity)
    }

    async createBook(book: BookEntity): Promise<BookEntity> {
        const createdBook = await BookModel.create({
            title: book.title,
            pages: book.pages,
            author: book.author,
            categories: book.categories
        })

        return toEntity(createdBook)
    }

    async updateBook(id: string, Book: BookEntity): Promise<BookEntity | null> {
        const updatedBook = await BookModel.findByIdAndUpdate(id, Book, { new: true })

        return toEntity(updatedBook!)
    }

    async deleteBook(id: string): Promise<boolean> {
        const deletedBook = await BookModel.findByIdAndDelete(id)
        return !!deletedBook
    }
}