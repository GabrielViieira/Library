import { useForm, Controller } from "react-hook-form";
import {
    bookSchema,
    type BookDataForm
} from "../books/schema/book.schema";

import { zodResolver } from "@hookform/resolvers/zod";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";

import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";

import { BookCreated } from "../books/hooks/createBook.hook";
import { AuthorList } from "../authors/hooks/listAuthors.hook";
import { listCategoryHook } from "../categories/hook/listCategory.hook";
import type { AuthorDataForm } from "../authors/schema/author.schema";
import type { CategoryFormData } from "../categories/schema/category.schema";

export function BookModal() {
    const authors = AuthorList();
    const categories = listCategoryHook();
    const bookMutation = BookCreated();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<BookDataForm>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            title: "",
            pages: undefined,
            author: "",
            categories: [],
        },
    });

    function onSubmit(data: BookDataForm) {
        bookMutation.mutate(data, {
            onSuccess: () => {
                alert("Livro adicionado com sucesso!");
                reset();
            },
        });
    }

    if (authors.isPending || categories.isPending) {
        return (
            <div className="w-full max-w-lg space-y-4 p-6">
                <div className="h-10 w-full animate-pulse rounded-lg bg-(--surface-hover)" />
                <div className="h-10 w-full animate-pulse rounded-lg bg-(--surface-hover)" />
                <div className="h-10 w-full animate-pulse rounded-lg bg-(--surface-hover)" />
                <div className="h-32 w-full animate-pulse rounded-lg bg-(--surface-hover)" />
            </div>
        );
    }

    if (authors.isError || categories.isError) {
        return (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                Erro ao carregar autores e categorias.
            </div>
        );
    }

    return (
        <div className="
            w-full
            max-w-lg
            rounded-2xl
            border
            border-(--border-color)
            bg-(--card-bg)
            p-6
            shadow-(--shadow-lg)
        ">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-(--text-main)">
                    Add Book
                </h2>

                <p className="mt-1 text-sm text-(--text-secondary)">
                    Register a new book in the collection.
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit, (errors) => {
                    console.log("ERROS DO FORM:", errors);
                })}
                className="space-y-5"
            >
                <div className="space-y-2">
                    <Label
                        htmlFor="title"
                        className="text-sm font-medium text-(--text-main)"
                    >
                        Book title
                    </Label>

                    <Input
                        id="title"
                        placeholder="Ex: Harry Potter"
                        disabled={bookMutation.isPending}
                        {...register("title")}
                        className="
                            h-10
                            w-full
                            bg-(--site-bg)
                            border-(--border-color)
                            text-(--text-main)
                            placeholder:text-(--text-secondary)
                            focus:border-(--primary-accent)
                            focus:ring-(--primary-accent)
                        "
                    />

                    {errors.title && (
                        <p className="text-xs text-red-400">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label
                        htmlFor="pages"
                        className="text-sm font-medium text-(--text-main)"
                    >
                        Number of pages
                    </Label>

                    <Input
                        id="pages"
                        type="number"
                        placeholder="Ex: 320"
                        disabled={bookMutation.isPending}
                        {...register("pages", {
                            valueAsNumber: true,
                        })}
                        className="
                            h-10
                            w-full
                            bg-(--site-bg)
                            border-(--border-color)
                            text-(--text-main)
                            placeholder:text-(--text-secondary)
                            focus:border-(--primary-accent)
                            focus:ring-(--primary-accent)
                        "
                    />

                    {errors.pages && (
                        <p className="text-xs text-red-400">
                            {errors.pages.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-medium text-(--text-main)">
                        Autor
                    </Label>

                    <Controller
                        name="author"
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                                disabled={bookMutation.isPending}
                            >
                                <SelectTrigger
                                    className="
                                        h-10
                                        w-full
                                        bg-(--site-bg)
                                        border-(--border-color)
                                        text-(--text-main)
                                        focus:border-(--primary-accent)
                                        focus:ring-(--primary-accent)
                                    "
                                >
                                    <SelectValue placeholder="Select an Author">
                                        {field.value
                                            ? authors.data?.find(
                                                (author: AuthorDataForm) =>
                                                    author.id === field.value
                                            )?.name
                                            : "Select an Author"}
                                    </SelectValue>
                                </SelectTrigger>

                                <SelectContent
                                    className="
                                        bg-(--card-bg)
                                        border-(--border-color)
                                    "
                                >
                                    <SelectGroup>
                                        {authors.data?.map((author: AuthorDataForm) => (
                                            <SelectItem
                                                key={author.id}
                                                value={author.id}
                                                className="
                                                    text-(--text-main)
                                                    focus:bg-(--surface-hover)
                                                    focus:text-(--text-main)
                                                "
                                            >
                                                {author.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-medium text-(--text-main)">
                        Cateories
                    </Label>

                    <p className="text-xs text-(--text-secondary)">
                        Select one or more categories.
                    </p>

                    <Controller
                        name="categories"
                        control={control}
                        render={({ field }) => {
                            const selected = field.value ?? [];

                            return (
                                <div className="
                                    max-h-48
                                    overflow-y-auto
                                    rounded-xl
                                    border
                                    border-(--border-color)
                                    bg-(--site-bg)
                                    p-2
                                ">
                                    <div className="space-y-1">
                                        {categories.data?.map(
                                            (category: CategoryFormData) => {
                                                const categoryId = String(
                                                    category.id
                                                );

                                                const checked =
                                                    selected.includes(
                                                        categoryId
                                                    );

                                                return (
                                                    <div
                                                        key={categoryId}
                                                        className="
                                                            flex
                                                            items-center
                                                            gap-3
                                                            rounded-lg
                                                            px-3
                                                            py-2
                                                            transition
                                                            hover:bg-(--surface-hover)
                                                        "
                                                    >
                                                        <Checkbox
                                                            id={`category-${categoryId}`}
                                                            checked={checked}
                                                            disabled={
                                                                bookMutation.isPending
                                                            }
                                                            onCheckedChange={(
                                                                value
                                                            ) => {
                                                                if (
                                                                    value === true
                                                                ) {
                                                                    field.onChange(
                                                                        [
                                                                            ...selected,
                                                                            categoryId,
                                                                        ]
                                                                    );
                                                                } else {
                                                                    field.onChange(
                                                                        selected.filter(
                                                                            (id) =>
                                                                                id !==
                                                                                categoryId
                                                                        )
                                                                    );
                                                                }
                                                            }}
                                                        />

                                                        <Label
                                                            htmlFor={`category-${categoryId}`}
                                                            className="
                                                                cursor-pointer
                                                                text-sm
                                                                font-medium
                                                                text-(--text-main)
                                                            "
                                                        >
                                                            {category.category}
                                                        </Label>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            );
                        }}
                    />

                    {errors.categories && (
                        <p className="text-xs text-red-400">
                            {errors.categories.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={bookMutation.isPending}
                    className="
                        w-full
                        rounded-xl
                        bg-(--primary-accent)
                        py-2.5
                        font-semibold
                        text-(--text-on-accent)
                        shadow-(--shadow-sm)
                        transition
                        hover:opacity-90
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >
                    {bookMutation.isPending
                        ? "Adding..."
                        : "Add Book"}
                </button>
            </form>
        </div>
    );
}