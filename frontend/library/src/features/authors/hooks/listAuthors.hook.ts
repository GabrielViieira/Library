import { useQuery } from "@tanstack/react-query";
import { listAuthors } from "../api/author.api";



export function AuthorList(){
    return useQuery({
        queryKey:["authors"],
        queryFn: listAuthors
    })
}