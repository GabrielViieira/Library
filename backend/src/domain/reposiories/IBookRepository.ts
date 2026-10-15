import type { Book } from "../entities/books.js";


export interface IBook{
    search(filters?: { title?: string; author?: string; category?: string }): Promise<Book[] | null>
    findAuthor(name: string): Promise<Book[] | null>
    findCategory(name: string): Promise<Book[] | null>
    createBook(Book: Book): Promise<Book>
    updateBook(id: string, Book: Book): Promise<Book | null>
    deleteBook(id: string): Promise<boolean>
}