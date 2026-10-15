import { useQuery } from "@tanstack/react-query";
import { searchBook, type BookSearchFilters } from "../api/book.api";


export function useSearchBooks(filters: BookSearchFilters) {
  return useQuery({
    queryKey: ["booksSearch", filters], 
    queryFn: () => searchBook(filters)
  })
}