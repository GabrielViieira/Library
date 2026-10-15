import { useMutation } from "@tanstack/react-query";
import { createAuthor } from "../api/author.api";
import type { AuthorDataForm } from "../schema/author.schema";



export function NewAuthor(){
    return useMutation({
        mutationFn:(author: AuthorDataForm) => createAuthor(author)
    })
}