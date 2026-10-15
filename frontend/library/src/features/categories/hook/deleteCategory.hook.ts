import { useMutation } from "@tanstack/react-query";
import { deleteCategory } from "../api/category.api";



export function deleteCategoryHook(){
    return useMutation({
        mutationFn:({
            id
        }:{
            id: string
        }) => deleteCategory(id)
    })
}