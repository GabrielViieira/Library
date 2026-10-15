import { useQuery } from "@tanstack/react-query";
import { searchCategory } from "../api/category.api";




export function searchCategoryHook(category: string){
    return useQuery({
        queryKey:["categories", category],
        queryFn:() => searchCategory(category),
        enabled: category.length > 0
    })
}