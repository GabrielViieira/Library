import { useMutation } from "@tanstack/react-query";
import { updateBook } from "../api/book.api";
import type { BookDataForm } from "../schema/book.schema";





export function BookUpdated() {
    return useMutation({
        mutationFn: ({ id, book }: { id: string, book: BookDataForm }) => updateBook(id, book)
    })
}