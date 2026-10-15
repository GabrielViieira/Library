import { useMutation } from "@tanstack/react-query";
import { deleteBook } from "../api/book.api";



export function BookDeleted(){
    return useMutation({
        mutationFn: (id: string) => deleteBook(id)
    })
}