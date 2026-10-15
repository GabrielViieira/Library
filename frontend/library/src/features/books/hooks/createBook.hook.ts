import { useMutation } from "@tanstack/react-query";
import { createBook } from "../api/book.api";
import type { BookDataForm } from "../schema/book.schema";





export function BookCreated(){
    return useMutation({
        mutationFn: (data: BookDataForm) => createBook(data)
    })
}