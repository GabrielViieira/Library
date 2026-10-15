import { useMutation } from "@tanstack/react-query";
import { updateCategory } from "../api/category.api";
import type { CategoryFormData } from "../schema/category.schema";




export function updateCategoryHook(){
    return useMutation({
        mutationFn:({
            id,
            data
        }: {
            id: string,
            data: CategoryFormData
        }) => updateCategory(id, data)
    })
}