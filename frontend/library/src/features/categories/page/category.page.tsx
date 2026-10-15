import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../../components/ui/card";
import { listCategoryHook } from "../hook/listCategory.hook";
import type { CategoryFormData } from "../schema/category.schema";

const categoryStyles: Record<string, string> = {
    "Science Fiction":
        "bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.25),transparent_55%)]",

    History:
        "bg-[radial-gradient(circle_at_50%_40%,rgba(148,163,184,0.18),transparent_60%)]",

    "Computer Science":
        "bg-[linear-gradient(135deg,rgba(59,130,246,0.18),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.15),transparent_40%)]",

    Science:
        "bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.2),transparent_60%)]",

    Philosophy:
        "bg-[radial-gradient(circle_at_50%_50%,rgba(96,165,250,0.15),transparent_60%)]",

    Economics:
        "bg-[linear-gradient(135deg,rgba(59,130,246,0.15),transparent_60%)]",
};

export function CategoryPage() {
    const navigate = useNavigate();

    const {
        data: categories,
        isPending,
        isError,
    } = listCategoryHook();

    if (isPending) {
        return (
            <main className="min-h-screen bg-background px-5 py-8">
                <div className="mx-auto max-w-6xl">
                    <div className="h-8 w-64 animate-pulse rounded bg-card" />

                    <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-card" />

                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-40 animate-pulse rounded-lg border border-border bg-card"
                            />
                        ))}
                    </div>
                </div>
            </main>
        );
    }

    if (isError) {
        return (
            <main className="min-h-screen bg-background px-5 py-8">
                <div className="mx-auto max-w-6xl">
                    <p className="text-sm text-red-400">
                        Não foi possível carregar as categorias.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background px-5 py-8">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Browse Categories
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Explore collections across diverse disciplines.
                    </p>
                </header>

                {/* Categories */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {categories?.map((cat: CategoryFormData) => {
                        const categoryName = cat.category;

                        return (
                            <Card
                                key={cat.id}
                                onClick={() =>
                                    navigate(
                                        `/books/search?category=${encodeURIComponent(
                                            categoryName
                                        )}`
                                    )
                                }
                                className={`
                                    group
                                    relative
                                    h-40
                                    cursor-pointer
                                    overflow-hidden
                                    rounded-lg
                                    border
                                    border-border
                                    bg-card
                                    shadow-sm
                                    transition-all
                                    duration-300

                                    hover:-translate-y-1
                                    hover:border-primary/50
                                    hover:shadow-lg
                                    hover:shadow-primary/10

                                    ${categoryStyles[categoryName] ?? ""}
                                `}
                            >
                                {/* Background glow */}
                                <div
                                    className="
                                        absolute
                                        inset-0
                                        bg-linear-to-br
                                        from-primary/5
                                        via-transparent
                                        to-primary/10
                                        opacity-70
                                        transition-opacity
                                        duration-300
                                        group-hover:opacity-100
                                    "
                                />

                                {/* Grid / decorative effect */}
                                <div
                                    className="
                                        absolute
                                        inset-0
                                        opacity-20
                                        bg-[linear-gradient(rgba(59,130,246,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.15)_1px,transparent_1px)]
                                    "
                                />

                                {/* Content */}
                                <CardContent
                                    className="
                                        relative
                                        z-10
                                        flex
                                        h-full
                                        items-center
                                        justify-center
                                        p-6
                                    "
                                >
                                    <h2
                                        className="
                                            max-w-[90%]
                                            text-center
                                            text-xl
                                            font-bold
                                            tracking-tight
                                            text-blue-200
                                            transition-all
                                            duration-300
                                            group-hover:scale-105
                                            group-hover:text-white
                                        "
                                    >
                                        {categoryName}
                                    </h2>
                                </CardContent>

                                {/* Bottom glow */}
                                <div
                                    className="
                                        absolute
                                        bottom-0
                                        left-1/2
                                        h-1
                                        w-0
                                        -translate-x-1/2
                                        rounded-full
                                        bg-primary
                                        shadow-[0_0_20px_rgba(59,130,246,0.8)]
                                        transition-all
                                        duration-300
                                        group-hover:w-1/2
                                    "
                                />
                            </Card>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}