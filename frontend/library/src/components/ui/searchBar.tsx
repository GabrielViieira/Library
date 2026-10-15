import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./command";
import { BookOpen, User, Tags } from "lucide-react";

import { useSearchBooks } from "../../features/books/hooks/searchBook.hook";
import { listCategoryHook } from "../../features/categories/hook/listCategory.hook";
import { AuthorList } from "../../features/authors/hooks/listAuthors.hook";

export function SearchBar() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const { data: books } = useSearchBooks({
        title: search,
        author: "",
        category: "",
    });

    const { data: authors } = AuthorList();
    const { data: categories } = listCategoryHook();

    const filteredAuthors = authors?.filter((author: any) =>
        author.name.toLowerCase().includes(search.toLowerCase())
    );

    const filteredCategories = categories?.filter((category: any) =>
        category.category.toLowerCase().includes(search.toLowerCase())
    );

    function handleSelectBook(title: string) {
        navigate(`/books?title=${encodeURIComponent(title)}`);
        setSearch("");
    }

    function handleSelectAuthor(id: string) {
        navigate(`/books?author=${encodeURIComponent(id)}`);
        setSearch("");
    }

    function handleSelectCategory(id: string) {
        navigate(`/books?category=${encodeURIComponent(id)}`);
        setSearch("");
    }

    return (
        <div className="relative w-64">
            <Command className="overflow-visible rounded-md border border-(--border-color) bg-(--card-bg)">
                <CommandInput
                    placeholder="Search catalog..."
                    value={search}
                    onValueChange={setSearch}
                />

                {search.length > 0 && (
                    <CommandList className="absolute left-0 right-0 top-full z-50 mt-1 max-h-80 rounded-md border border-(--border-color) bg-(--card-bg) shadow-lg">
                        <CommandEmpty>
                            No results found.
                        </CommandEmpty>

                        {books?.length > 0 && (
                            <CommandGroup heading="Books">
                                {books.slice(0, 5).map((book: any) => (
                                    <CommandItem
                                        key={book._id}
                                        value={book.title}
                                        onSelect={() =>
                                            handleSelectBook(book.title)
                                        }
                                        className="cursor-pointer"
                                    >
                                        <BookOpen className="mr-2 h-4 w-4 text-(--primary-accent)" />

                                        <div>
                                            <p className="text-sm text-(--text-main)">
                                                {book.title}
                                            </p>

                                            <p className="text-xs text-(--text-secondary)">
                                                {book.author?.name}
                                            </p>
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}

                        {filteredAuthors?.length > 0 && (
                            <CommandGroup heading="Authors">
                                {filteredAuthors.slice(0, 5).map(
                                    (author: any) => (
                                        <CommandItem
                                            key={author.id}
                                            value={author.name}
                                            onSelect={() =>
                                                handleSelectAuthor(author.id)
                                            }
                                            className="cursor-pointer"
                                        >
                                            <User className="mr-2 h-4 w-4 text-(--primary-accent)" />

                                            <span className="text-sm text-(--text-main)">
                                                {author.name}
                                            </span>
                                        </CommandItem>
                                    )
                                )}
                            </CommandGroup>
                        )}

                        {filteredCategories?.length > 0 && (
                            <CommandGroup heading="Categories">
                                {filteredCategories.slice(0, 5).map(
                                    (category: any) => (
                                        <CommandItem
                                            key={category.id}
                                            value={category.category}
                                            onSelect={() =>
                                                handleSelectCategory(
                                                    category.id
                                                )
                                            }
                                            className="cursor-pointer"
                                        >
                                            <Tags className="mr-2 h-4 w-4 text-(--primary-accent)" />

                                            <span className="text-sm text-(--text-main)">
                                                {category.category}
                                            </span>
                                        </CommandItem>
                                    )
                                )}
                            </CommandGroup>
                        )}
                    </CommandList>
                )}
            </Command>
        </div>
    );
}