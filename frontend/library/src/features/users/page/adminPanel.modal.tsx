import { useState } from "react";
import { BookModal } from "../../AdminModal/books.modal";
import { AuthorModal } from "../../AdminModal/author.modal";
import { CategoryModal } from "../../AdminModal/category.modal";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
    DialogOverlay,
    DialogHeader,
} from "../../../components/ui/dialog";

export function AdminPanel() {
    const [abaAtiva, setAbaAtiva] = useState("books");

    const tabs = [
        {
            id: "books",
            label: "Books",
            icon: "📚",
        },
        {
            id: "authors",
            label: "Authors",
            icon: "✍️",
        },
        {
            id: "category",
            label: "Categories",
            icon: "🏷️",
        },
    ];

    return (
        <Dialog>
            <DialogTrigger
                className="
                    inline-flex items-center justify-center gap-2
                    cursor-pointer
                    rounded-lg
                    bg-primary
                    px-4 py-2
                    text-sm font-semibold
                    text-primary-foreground
                    shadow-sm
                    transition-all
                    hover:bg-primary/90
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-ring
                "
            >
                ⚙️
                Admin Panel
            </DialogTrigger>

            <DialogOverlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />

            <DialogContent
                className="
                    fixed
                    left-1/2
                    top-1/2
                    z-50
                    w-[calc(100%-2rem)]
                    max-w-3xl
                    -translate-x-1/2
                    -translate-y-1/2

                    overflow-hidden
                    rounded-2xl
                    border
                    border-border
                    bg-background
                    p-0
                    text-foreground
                    shadow-2xl

                    animate-in
                    fade-in-0
                    zoom-in-95
                    duration-200
                "
            >
                {/* Header */}
                <DialogHeader
                    className="
                        border-b
                        border-border
                        bg-card
                        px-6
                        py-5
                    "
                >
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <DialogTitle className="text-2xl font-bold tracking-tight text-foreground">
                                Adminintrator Panel
                            </DialogTitle>

                            <DialogDescription className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                                Manage the library collection by adding
                                books, authors, and categories.
                            </DialogDescription>
                        </div>

                        <div
                            className="
                                hidden
                                rounded-xl
                                border
                                border-primary/20
                                bg-primary/10
                                px-3
                                py-2
                                text-xl
                                sm:block
                            "
                        >
                            ⚙️
                        </div>
                    </div>
                </DialogHeader>

                {/* Tabs */}
                <div className="border-b border-border bg-card px-6 py-4">
                    <div
                        className="
                            grid
                            grid-cols-3
                            gap-1
                            rounded-xl
                            border
                            border-border
                            bg-background
                            p-1
                        "
                    >
                        {tabs.map((tab) => {
                            const active = abaAtiva === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setAbaAtiva(tab.id)}
                                    className={`
                                        flex
                                        cursor-pointer
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-lg
                                        px-3
                                        py-2.5
                                        text-sm
                                        font-semibold
                                        transition-all

                                        ${active
                                            ? "bg-primary text-primary-foreground shadow-sm"
                                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                        }
                                    `}
                                >
                                    <span>{tab.icon}</span>

                                    <span className="hidden sm:inline">
                                        {tab.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content */}
                <div
                    className="
                        min-h-90
                        max-h-[60vh]
                        overflow-y-auto
                        bg-background
                        px-6
                        py-6
                    "
                >
                    {abaAtiva === "books" && (
                        <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-200">
                            <BookModal />
                        </div>
                    )}

                    {abaAtiva === "authors" && (
                        <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-200">
                            <AuthorModal />
                        </div>
                    )}

                    {abaAtiva === "category" && (
                        <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-200">
                            <CategoryModal />
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-t
                        border-border
                        bg-card
                        px-6
                        py-3
                    "
                >
                    <span className="text-xs text-muted-foreground">
                       Library management
                    </span>

                    <span
                        className="
                            rounded-full
                            border
                            border-primary/20
                            bg-primary/10
                            px-2.5
                            py-1
                            text-xs
                            font-medium
                            text-primary
                        "
                    >
                        Admin
                    </span>
                </div>
            </DialogContent>
        </Dialog>
    );
}