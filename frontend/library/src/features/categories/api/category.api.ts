import { api } from "../../../lib/axios";
import type { CategoryFormData } from "../schema/category.schema";




export async function listCategory() {
    const { data } = await api.get("/category/list")

    return data
}

export async function searchCategory(category: string) {
    const { data } = await api.get(`/category/search?category=${category}`)

    return data
}

export async function createCategory(data: { category: string }) {
    const { data: responseData } = await api.post("/category/create", data)

    return responseData
}

export async function updateCategory(id: string, category: CategoryFormData) {
    const { data } = await api.put(`/category/edit/${id}`, category)

    return data
}

export async function deleteCategory(id: string) {
    const data = await api.delete(`/category/delete/${id}`)

    return data
}