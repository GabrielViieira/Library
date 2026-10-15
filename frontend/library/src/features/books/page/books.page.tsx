import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "../../../components/ui/card";
import { useSearchBooks } from "../hooks/searchBook.hook";
import { Controller, useForm } from "react-hook-form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { AuthorList } from "../../authors/hooks/listAuthors.hook";
import { listCategoryHook } from "../../categories/hook/listCategory.hook";
import type { BookDataForm } from "../schema/book.schema";
import type { CategoryFormData } from "../../categories/schema/category.schema";
import type { AuthorDataForm } from "../../authors/schema/author.schema";

type FilterForm = {
  title: string;
  author: string;
  category: string;
};

export function BooksPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFilter = searchParams.get("category") || "";
  const authorFilter = searchParams.get("author") || "";
  const titleFilter = searchParams.get("title") || "";
  const author = AuthorList()
  const category = listCategoryHook()

  const {
    data: books,
    isPending,
    isError,
  } = useSearchBooks({
    category: categoryFilter,
    author: authorFilter,
    title: titleFilter,
  })

  const {
    register,
    handleSubmit,
    reset,
    control
  } = useForm<FilterForm>({
    defaultValues: {
      title: searchParams.get("title") || "",
      author: searchParams.get("author") || "",
      category: searchParams.get("category") || "",
    }
  })

  function onSubmit(data: FilterForm) {
    const params = new URLSearchParams();

    if (data.title) {
      params.set("title", data.title);
    }

    if (data.author) {
      params.set("author", data.author);
    }

    if (data.category) {
      params.set("category", data.category);
    }

    setSearchParams(params);
  }

  function clearFilters() {
    reset({
      title: "",
      author: "",
      category: "",
    });

    setSearchParams({});
  }

  if (author.isError || category.isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        Error loading authors and categories.
      </div>
    );
  }

  if (isPending) {
    return (
      <main className="min-h-screen bg-background px-5 py-6">
        <div className="mx-auto max-w-6xl">
          <div className="h-6 w-48 animate-pulse rounded bg-card" />

          <div className="mt-2 h-4 w-72 animate-pulse rounded bg-card" />

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-64 animate-pulse rounded-lg border border-border bg-card"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-background px-5 py-6">
        <p className="text-sm text-red-400">
          Error loading the books.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-5 py-6">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Featured Collection
            </h1>

            <p className="mt-1 text-xs text-muted-foreground">
              Explore the books available in the library.
            </p>
          </div>

        </div>

        {/* PAINEL DE FILTROS */}
        <div className="p-1">

          <div className="flex items-center justify-between mb-1">
            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("book-filters")
                  ?.classList.toggle("hidden");
              }}
              className="
                        px-4 py-2
                        border border-(--border-color)
                        rounded-lg
                        text-sm
                        text-(--text-main)
                        hover:bg-(--surface-hover)
                        transition
                    "
            >
              ⚙ Filters
            </button>
          </div>

          {/* Filtros */}
          <form
            id="book-filters"
            onSubmit={handleSubmit(onSubmit)}
            className="
                    
                    mb-6
                    p-4
                    rounded-xl
                    border border-(--border-color)
                    bg-(--card-bg)
                    grid grid-cols-1 md:grid-cols-4
                    gap-3
                "
          >
            <input
              {...register("title")}
              placeholder="Title"
              className="
                        h-8 px-3
                        rounded-lg
                        bg-(--site-bg)
                        border border-(--border-color)
                        text-(--text-main)
                        placeholder:text-(--text-secondary)
                        outline-none
                        focus:border-(--primary-accent)
                    "
            />
            {/* Authors*/}
            <div className="space-y-2">

              <Controller
                name="author"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      className="
            w-full
            h-10
            bg-(--site-bg)
            border-(--border-color)
            text-(--text-main)
            rounded-lg
            focus:ring-2
            focus:ring-(--primary-accent)
          "
                    >
                      <SelectValue placeholder="Select an Author" />
                    </SelectTrigger>

                    <SelectContent
                      className="
            bg-(--card-bg)
            border-(--border-color)
          "
                    >
                      <SelectGroup>
                        {author.data?.map((authors: AuthorDataForm) => (
                          <SelectItem
                            key={authors.id}
                            value={authors.name}
                            className="
                  text-(--text-main)
                  focus:bg-(--surface-hover)
                  focus:text-(--text-main)
                "
                          >
                            {authors.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Categories*/}
            <div className="space-y-2">
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      className="
            w-full
            h-10
            bg-(--site-bg)
            border-(--border-color)
            text-(--text-main)
            rounded-lg
            focus:ring-2
            focus:ring-(--primary-accent)
          "
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>

                    <SelectContent
                      className="
            bg-(--card-bg)
            border-(--border-color)
          "
                    >
                      <SelectGroup>
                        {category.data?.map((categories: CategoryFormData) => (
                          <SelectItem
                            key={categories.id}
                            value={categories.category}
                            className="
                  text-(--text-main)
                  focus:bg-(--surface-hover)
                  focus:text-(--text-main)
                "
                          >
                            {categories.category}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="
                            flex-1
                            h-10
                            rounded-lg
                            bg-(--primary-accent)
                            text-white
                            font-medium
                            hover:opacity-90
                            transition
                            cursor-pointer
                        "
              >
                Apply
              </button>

              <button
                type="button"
                onClick={clearFilters}
                className="
                            px-4
                            h-10
                            rounded-lg
                            border border-(--border-color)
                            text-(--text-secondary)
                            hover:bg-(--surface-hover)
                            transition
                            cursor-pointer
                        "
              >
                Clean
              </button>
            </div>
          </form>
        </div>

        {/* LIVROS */}
        {books && books.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

            {books.map((book: BookDataForm) => (
              <Card
                key={book.id}
                className="
                                    group
                                    overflow-hidden
                                    border-border
                                    bg-card
                                    py-0
                                    transition-all
                                    duration-200
                                    hover:-translate-y-0.5
                                    hover:border-primary/40
                                    hover:shadow-md
                                    cursor-pointer
                                "
              >
                {/* CAPA */}
                <div className="relative h-52 overflow-hidden bg-slate-900">

                  {book.imageUrl ? (
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="
                                                h-full
                                                w-full
                                                object-cover
                                                transition-transform
                                                duration-300
                                                group-hover:scale-105
                                            "
                    />
                  ) : (
                    <div
                      className="
                                                flex
                                                h-full
                                                w-full
                                                items-center
                                                justify-center
                                                bg-linear-to-br
                                                from-slate-800
                                                to-slate-950
                                                p-4
                                                text-center
                                            "
                    >
                      <span className="text-sm font-bold text-blue-200">
                        {book.title}
                      </span>
                    </div>
                  )}

                  <span
                    className="
                                            absolute
                                            right-2
                                            top-2
                                            rounded-sm
                                            bg-primary
                                            px-1.5
                                            py-0.5
                                            text-[8px]
                                            font-bold
                                            uppercase
                                            text-white
                                        "
                  >
                    Available
                  </span>
                </div>

                {/* CONTEÚDO */}
                <CardContent className="space-y-1.5 p-3">

                  <h2
                    className="
                                            line-clamp-2
                                            text-xs
                                            font-bold
                                            leading-4
                                            text-blue-300
                                            group-hover:text-blue-200
                                        "
                  >
                    {book.title}
                  </h2>

                  <p className="truncate text-[10px] text-muted-foreground">
                    {book.author ||
                      "Autor desconhecido"}
                  </p>

                  {book.pages && (
                    <p className="text-[9px] text-muted-foreground">
                      {book.pages} páginas
                    </p>
                  )}

                  {book.categories && (
                    <div className="pt-1">
                      <span
                        className="
                                                    rounded
                                                    bg-primary/10
                                                    px-1.5
                                                    py-0.5
                                                    text-[8px]
                                                    font-medium
                                                    text-blue-300
                                                "
                      >
                        {book.categories}
                      </span>
                    </div>
                  )}

                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-border bg-card">
            <CardContent className="py-10 text-center">
              <p className="text-sm font-medium text-foreground">
                Nenhum livro encontrado.
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Tente alterar os filtros de pesquisa.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}