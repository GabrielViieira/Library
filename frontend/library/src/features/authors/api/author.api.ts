import { api } from "../../../lib/axios";
import type { AuthorDataForm } from "../schema/author.schema";



export async function listAuthors() {
    const {data} = await api.get("/author/list")

    return data
}

export async function searchAuthor(author: string) {
    const {data} = await api.get(`/author/search?author=${author}`)

    return data
}

export async function createAuthor(author: AuthorDataForm) {
   const {data} = await api.post("/author/create", author)

    return data
}

export async function updateAuthor(id: string, author: AuthorDataForm) {
    const {data} = await api.put(`/author/edit/${id}`, author)

    return data
}

export async function deleteAuthor(id: string) {
    const data = await api.delete(`/author/delete/${id}`)

    return data
}