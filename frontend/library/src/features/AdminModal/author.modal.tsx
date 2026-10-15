import { useForm } from "react-hook-form";
import { NewAuthor } from "../authors/hooks/createAuthor.hook";
import {
    AuthorSchema,
    type AuthorDataForm
} from "../authors/schema/author.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

export function AuthorModal() {
    const authorMutation = NewAuthor();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AuthorDataForm>({
        resolver: zodResolver(AuthorSchema),
    });

    function onSubmit(data: AuthorDataForm) {
        authorMutation.mutate(data, {
            onSuccess: () => {
                alert("Autor criado com sucesso!");
                reset();
            },
        });
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
                    Add Author
                </h2>

                <p className="mt-1 text-sm text-(--text-secondary)">
                    Register a new author in the library.
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
                <div className="space-y-2">
                    <Label
                        htmlFor="name"
                        className="text-sm font-medium text-(--text-main)"
                    >
                        Name of Author
                    </Label>

                    <Input
                        id="name"
                        type="text"
                        placeholder="Ex: J.K. Rowling"
                        disabled={authorMutation.isPending}
                        {...register("name")}
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

                    {errors.name && (
                        <p className="text-xs text-red-400">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label
                        htmlFor="biography"
                        className="text-sm font-medium text-(--text-main)"
                    >
                        Bio
                    </Label>

                    <Textarea
                        id="biography"
                        placeholder="Write a brief biography of the author...."
                        disabled={authorMutation.isPending}
                        {...register("biography")}
                        className="
                            min-h-32
                            w-full
                            resize-none
                            bg-(--site-bg)
                            border-(--border-color)
                            text-(--text-main)
                            placeholder:text-(--text-secondary)
                            focus:border-(--primary-accent)
                            focus:ring-(--primary-accent)
                        "
                    />

                    {errors.biography && (
                        <p className="text-xs text-red-400">
                            {errors.biography.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={authorMutation.isPending}
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
                    {authorMutation.isPending
                        ? "Adding..."
                        : "Add Author"}
                </button>
            </form>
        </div>
    );
}