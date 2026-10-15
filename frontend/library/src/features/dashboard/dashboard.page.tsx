import {
    BookOpen,
    Users,
    Tags,
    TrendingUp,
} from "lucide-react";
import { listCategoryHook } from "../categories/hook/listCategory.hook";
import { AuthorList } from "../authors/hooks/listAuthors.hook";
import { useSearchBooks } from "../books/hooks/searchBook.hook";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import type { CategoryFormData } from "../categories/schema/category.schema";
import type { BookDataForm } from "../books/schema/book.schema";
import type { AuthorDataForm } from "../authors/schema/author.schema";


export function DashboardPage() {
    const {
        data: categories = [],
        isPending: categoriesPending,
        isError: categoriesError
    } = listCategoryHook();

    const {
        data: authors = [],
        isPending: authorsPending,
        isError: authorsError
    } = AuthorList();

    const {
        data: books = [],
        isPending: booksPending,
        isError: booksError
    } = useSearchBooks({
        title: "",
        author: "",
        category: ""
    });

    const totalBooks = books.length ?? 0;
    const totalAuthors = authors.length ?? 0;
    const totalCategories = categories.length ?? 0;

    const maxCategory = Math.max(
        ...categories.map((category: CategoryFormData) => {
            return books.filter(
                (book: any) =>
                    book.categories === category.category
            ).length ?? 0;
        }),
        1
    );

    const recentBooks = [...(books ?? [])]
        .slice(-5)
        .reverse();

    if (authorsError || categoriesError || booksError) {
        return (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                Erro ao carregar autores e categorias.
            </div>
        );
    }
    console.log(books)

    return (
        <main className="min-h-screen bg-(--site-bg) px-4 py-6 text-(--text-main) md:px-6">
            <div className="mx-auto max-w-7xl space-y-6">

                <section>
                    <div className="border-t border-(--border-color) pt-5">
                        <h1 className="text-2xl font-bold tracking-tight text-(--text-main)">
                            Library Overview
                        </h1>

                        <p className="mt-1 text-sm text-(--text-secondary)">
                            Real-time statistics for your library.
                        </p>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    <Card className="border-(--border-color) bg-(--card-bg) shadow-(--shadow-sm)">
                        <CardContent className="p-5">

                            <div className="flex items-center justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--accent-bg)">
                                    <BookOpen className="h-5 w-5 text-(--primary-accent)" />
                                </div>

                                <TrendingUp className="h-4 w-4 text-(--primary-accent)" />
                            </div>

                            <div className="mt-5">
                                <p className="text-xs font-semibold uppercase tracking-wider text-(--text-secondary)">
                                    Total Collection
                                </p>

                                <p className="mt-1 text-3xl font-bold text-(--text-main)">
                                    {booksPending ? "..." : totalBooks.toLocaleString()}
                                </p>
                            </div>

                            <div className="mt-4 h-1 rounded-full bg-(--surface-hover)">
                                <div className="h-1 w-3/4 rounded-full bg-(--primary-accent)" />
                            </div>

                        </CardContent>
                    </Card>

                    <Card className="border-(--border-color) bg-(--card-bg) shadow-(--shadow-sm)">
                        <CardContent className="p-5">

                            <div className="flex items-center justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--accent-bg)">
                                    <Users className="h-5 w-5 text-(--primary-accent)" />
                                </div>

                                <span className="text-xs font-medium text-(--primary-accent)">
                                    Authors
                                </span>
                            </div>

                            <div className="mt-5">
                                <p className="text-xs font-semibold uppercase tracking-wider text-(--text-secondary)">
                                    Total Authors
                                </p>

                                <p className="mt-1 text-3xl font-bold text-(--text-main)">
                                    {authorsPending ? "..." : totalAuthors.toLocaleString()}
                                </p>
                            </div>

                            <div className="mt-4 h-1 rounded-full bg-(--surface-hover)">
                                <div className="h-1 w-2/3 rounded-full bg-(--primary-accent)" />
                            </div>

                        </CardContent>
                    </Card>

                    <Card className="border-(--border-color) bg-(--card-bg) shadow-(--shadow-sm)">
                        <CardContent className="p-5">

                            <div className="flex items-center justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--accent-bg)">
                                    <Tags className="h-5 w-5 text-(--primary-accent)" />
                                </div>

                                <span className="text-xs font-medium text-(--text-secondary)">
                                    Categories
                                </span>
                            </div>

                            <div className="mt-5">
                                <p className="text-xs font-semibold uppercase tracking-wider text-(--text-secondary)">
                                    Total Categories
                                </p>

                                <p className="mt-1 text-3xl font-bold text-(--text-main)">
                                    {categoriesPending ? "..." : totalCategories.toLocaleString()}
                                </p>
                            </div>

                            <div className="mt-4 h-1 rounded-full bg-(--surface-hover)">
                                <div className="h-1 w-1/2 rounded-full bg-(--primary-accent)" />
                            </div>

                        </CardContent>
                    </Card>

                </section>

                <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">

                    <Card className="border-(--border-color) bg-(--card-bg) lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-lg text-(--text-main)">
                                Collection Overview
                            </CardTitle>

                            <p className="text-xs text-(--text-secondary)">
                                Number of books available in each category.
                            </p>
                        </CardHeader>

                        <CardContent>
                            <div className="space-y-5">

                                {categories.length === 0 ? (
                                    <p className="text-sm text-(--text-secondary)">
                                        No categories available.
                                    </p>
                                ) : (
                                    categories.slice(0, 6).map((category: CategoryFormData) => {

                                        const total = books.filter((book: BookDataForm) =>
                                            book.categories?.some(
                                                (cat: any) => cat.category === category.category
                                            )
                                        ).length
                                        const percentage =
                                            maxCategory > 0
                                                ? (total / maxCategory) * 100
                                                : 0;

                                        return (
                                            <div
                                                key={category.id}
                                                className="space-y-2"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-(--text-main)">
                                                        {category.category}
                                                    </span>

                                                    <span className="text-xs text-(--text-secondary)">
                                                        {total} books
                                                    </span>
                                                </div>

                                                <div className="h-2 overflow-hidden rounded-full bg-(--surface-hover)">
                                                    <div
                                                        className="h-full rounded-full bg-(--primary-accent) transition-all"
                                                        style={{
                                                            width: `${percentage}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })
                                )}

                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-(--border-color) bg-(--card-bg)">
                        <CardHeader>
                            <CardTitle className="text-lg text-(--text-main)">
                                Authors
                            </CardTitle>

                            <p className="text-xs text-(--text-secondary)">
                                Authors registered in the library.
                            </p>
                        </CardHeader>

                        <CardContent>
                            <div className="space-y-3">

                                {authors.length === 0 ? (
                                    <p className="text-sm text-(--text-secondary)">
                                        No authors available.
                                    </p>
                                ) : (
                                    authors.slice(0, 6).map((authors: AuthorDataForm) => {

                                        const total = books.filter(
                                            (book: any) =>
                                                String(book.author?._id) === String(authors.id)
                                        ).length ?? 0

                                        return (
                                            <div
                                                key={authors.id}
                                                className="flex items-center justify-between rounded-lg border border-(--border-color) bg-(--site-bg) px-3 py-3"
                                            >
                                                <div className="flex min-w-0 items-center gap-3">
                                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-(--accent-bg)">
                                                        <Users className="h-4 w-4 text-(--primary-accent)" />
                                                    </div>

                                                    <span className="truncate text-sm font-medium text-(--text-main)">
                                                        {authors.name}
                                                    </span>
                                                </div>

                                                <span className="ml-3 text-xs text-(--text-secondary)">
                                                    {total}
                                                </span>
                                            </div>
                                        );
                                    })
                                )}

                            </div>
                        </CardContent>
                    </Card>

                </section>

                <Card className="border-(--border-color) bg-(--card-bg)">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-lg text-(--text-main)">
                                Recent Books
                            </CardTitle>

                            <p className="mt-1 text-xs text-(--text-secondary)">
                                Recently added books to the collection.
                            </p>
                        </div>

                        <BookOpen className="h-5 w-5 text-(--primary-accent)" />
                    </CardHeader>

                    <CardContent>
                        <div className="overflow-x-auto">

                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-(--border-color)">
                                        <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wider text-(--text-secondary)">
                                            Book
                                        </th>

                                        <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wider text-(--text-secondary)">
                                            Pages
                                        </th>

                                        <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wider text-(--text-secondary)">
                                            Category
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {recentBooks.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="px-3 py-8 text-center text-sm text-(--text-secondary)"
                                            >
                                                No books available.
                                            </td>
                                        </tr>
                                    ) : (
                                        recentBooks.map((book: BookDataForm) => (
                                            <tr
                                                key={book.id}
                                                className="border-b border-(--border-color) last:border-0 hover:bg-(--surface-hover)/30"
                                            >
                                                <td className="px-3 py-3">
                                                    <div>
                                                        <p className="text-sm font-semibold text-(--text-main)">
                                                            {book.title}
                                                        </p>

                                                        <p className="text-xs text-(--text-secondary)">
                                                            {book.author ?? "Unknown author"}
                                                        </p>
                                                    </div>
                                                </td>

                                                <td className="px-3 py-3 text-sm text-(--text-secondary)">
                                                    {book.pages}
                                                </td>

                                                <td className="px-3 py-3">
                                                    <span className="rounded-md bg-(--accent-bg) px-2 py-1 text-xs font-medium text-(--primary-accent)">
                                                        {book.categories ?? "General"}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>

                        </div>
                    </CardContent>
                </Card>

            </div>
        </main>
    );
}