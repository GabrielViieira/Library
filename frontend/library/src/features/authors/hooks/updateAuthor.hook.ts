import { useMutation } from "@tanstack/react-query";
import { updateAuthor } from "../api/author.api";
import type { AuthorDataForm } from "../schema/author.schema";




export function AuthorUpdated() {
    return useMutation({
        mutationFn: ({ id, author }: { id: string, author: AuthorDataForm }) => updateAuthor(id, author)
    })
}