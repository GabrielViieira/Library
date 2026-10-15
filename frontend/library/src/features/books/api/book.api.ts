import { api } from "../../../lib/axios";
import type { BookDataForm } from "../schema/book.schema";


export interface BookSearchFilters {
    title?: string;
    author?: string;
    category?: string;
}

export async function searchBook(filters: BookSearchFilters) {
    const { data } = await api.get("/books/search", {
        params: filters
    })

    return data
}

export async function createBook(book: BookDataForm) {
    const {data} = await api.post("/books/create", book)

    return data
}

export async function updateBook(id: string, book: BookDataForm) {
    const {data} = await api.put(`/books/edit/${id}`, book)
    
    return data
}

export async function deleteBook(id: string) {
    const data = await api.delete(`/books/delete/${id}`)

    return data
}