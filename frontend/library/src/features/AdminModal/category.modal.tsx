import { useForm } from "react-hook-form";
import {
    CategorySchema,
    type CategoryFormData
} from "../categories/schema/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategoryHook } from "../categories/hook/createCategory.hook";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export function CategoryModal() {
    const categoryMutation = createCategoryHook();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CategoryFormData>({
        resolver: zodResolver(CategorySchema),
    });

    function onSubmit(data: CategoryFormData) {
        categoryMutation.mutate(data, {
            onSuccess: () => {
                alert("Categoria adicionada com sucesso!");
                reset();
            },
        });
    }

    return (
        <div
            className="
                w-full
                max-w-lg
                rounded-2xl
                border
                border-(--border-color)
                bg-(--card-bg)
                p-6
                shadow-(--shadow-lg)
            "
        >
            <div className="mb-6">
                <h2 className="text-xl font-bold text-(--text-main)">
                    Add Category
                </h2>

                <p className="mt-1 text-sm text-(--text-secondary)">
                    Register a new category to organize the collection.
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
                <div className="space-y-2">
                    <Label
                        htmlFor="category"
                        className="text-sm font-medium text-(--text-main)"
                    >
                        Category Name
                    </Label>

                    <Input
                        id="category"
                        type="text"
                        placeholder="Ex: Fantasia"
                        disabled={categoryMutation.isPending}
                        {...register("category")}
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

                    {errors.category && (
                        <p className="text-xs text-red-400">
                            {errors.category.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={categoryMutation.isPending}
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
                    {categoryMutation.isPending
                        ? "Adding..."
                        : "Add Category"}
                </button>
            </form>
        </div>
    );
}