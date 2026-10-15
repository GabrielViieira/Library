import { useMutation } from "@tanstack/react-query";
import { deleteAuthor } from "../api/author.api";




export function AuthorDeleted(){
    return useMutation({
        mutationFn: (id: string) => deleteAuthor(id)
    })
}