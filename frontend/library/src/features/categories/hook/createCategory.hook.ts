import { useMutation } from "@tanstack/react-query";
import { createCategory } from "../api/category.api";




export function createCategoryHook() {
    return useMutation({
        mutationFn: (data: { category: string }) => createCategory(data)
    })
}