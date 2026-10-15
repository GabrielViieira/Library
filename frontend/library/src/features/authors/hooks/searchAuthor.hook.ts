import { useQuery } from "@tanstack/react-query";
import { searchAuthor } from "../api/author.api";



export function AuthorQuery(author: string){
    return useQuery({
        queryKey:["authors"],
        queryFn:() => searchAuthor(author)
    })
}