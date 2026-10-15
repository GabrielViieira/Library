import { useQuery } from "@tanstack/react-query";
import { listCategory } from "../api/category.api";




export function listCategoryHook(){
    return useQuery({
        queryKey:["category"],
        queryFn:listCategory
    })
}