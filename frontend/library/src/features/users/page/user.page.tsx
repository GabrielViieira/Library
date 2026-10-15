import { useNavigate, useParams } from "react-router-dom";
import { useDeleteUser } from "../hooks/deleteUser.hook";
import { useAuthUser } from "../hooks/fetchUser.hook";
import { profileUserHook } from "../hooks/profileUser.hook";
import { useState } from "react";
import { EditProfileModal } from "./user.modal";
import {
    BookOpen,
    Lock,
    Bell,
    Eye,
    Settings,
    ArrowRight,
    UserRound,
} from "lucide-react";

export function UserPage() {
    const userDeleteMutation = useDeleteUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { username } = useParams<{ username: string }>();
    const navigate = useNavigate();

    const { data: user, isPending, isError } = useAuthUser();
    const { data: profileUser } = profileUserHook(username!);

    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-(--site-bg)">
                <p className="text-sm text-(--text-secondary)">
                    Carregando perfil...
                </p>
            </div>
        );
    }

    if (isError || !user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-(--site-bg)">
                <p className="text-sm text-(--text-secondary)">
                    Erro ao carregar dados do usuário.
                </p>
            </div>
        );
    }

    const avatarUrl =
        user.imageUrl && user.imageUrl !== "none"
            ? user.imageUrl
            : null;

    const isAdmin = user.role?.includes("admin");

    function deleteUser(id: string) {
        const desejaDeletar = confirm(
            "Deseja realmente deletar sua conta?"
        );

        if (!desejaDeletar) return;

        userDeleteMutation.mutate(
            { id },
            {
                onSuccess: () => {
                    localStorage.removeItem("token");
                    navigate("/login");
                },
            }
        );
    }

    const borrowedBooks = [
        {
            title: "Structural Ethics",
            author: "D. V. Hargan",
            status: "Due in 4 days",
        },
        {
            title: "The Alchemist's...",
            author: "Marcus Vane",
            status: "Overdue: 2 days",
        },
        {
            title: "Neural Frontiers",
            author: "Sarah Chan",
            status: "Due today",
        },
    ];

    const activity = [32, 45, 18, 57, 61, 42];

    return (
        <main className="min-h-screen bg-(--site-bg) px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl space-y-4">

                <section className="flex flex-col gap-5 px-1 py-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-(--border-color) bg-(--card-bg)">
                            {avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt={user.username}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                    <UserRound className="h-10 w-10 text-(--primary-accent)" />
                                </div>
                            )}
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-(--text-main)">
                                {user.username}
                            </h1>

                            <p className="mt-1 text-xs text-(--text-secondary)">
                                <span className="text-(--primary-accent)">
                                    ◉
                                </span>{" "}
                                {isAdmin ? "Administrator" : "Library Member"}
                                {" • "}
                                Member since 2021
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-7">
                        <div className="text-center">
                            <strong className="block text-lg font-semibold text-(--text-main)">
                                142
                            </strong>
                            <span className="text-[9px] uppercase tracking-wider text-(--text-secondary)">
                                Read
                            </span>
                        </div>

                        <div className="text-center">
                            <strong className="block text-lg font-semibold text-(--text-main)">
                                12
                            </strong>
                            <span className="text-[9px] uppercase tracking-wider text-(--text-secondary)">
                                Active
                            </span>
                        </div>

                        <div className="text-center">
                            <strong className="block text-lg font-semibold text-(--text-main)">
                                8.4k
                            </strong>
                            <span className="text-[9px] uppercase tracking-wider text-(--text-secondary)">
                                Points
                            </span>
                        </div>
                    </div>
                </section>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_330px]">

                    <section className="rounded-md border border-(--border-color) bg-(--card-bg) p-5">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Settings className="h-4 w-4 text-(--primary-accent)" />

                                <h2 className="text-sm font-semibold text-(--text-main)">
                                    Account Settings
                                </h2>
                            </div>

                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-wider text-(--text-secondary)">
                                    Display Name
                                </label>

                                <div className="rounded-sm border border-(--border-color) bg-(--site-bg) px-3 py-2 text-xs text-(--text-main)">
                                    {user.username}
                                </div>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-wider text-(--text-secondary)">
                                    Email Address
                                </label>

                                <div className="rounded-sm border border-(--border-color) bg-(--site-bg) px-3 py-2 text-xs text-(--text-main)">
                                    {user.email}
                                </div>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-wider text-(--text-secondary)">
                                    Librarian ID
                                </label>

                                <div className="flex items-center justify-between rounded-sm border border-(--border-color) bg-(--site-bg) px-3 py-2 text-xs text-(--text-main)">
                                    <span>#{user.id?.slice(-8) ?? "N/A"}</span>
                                    <Lock className="h-3 w-3 text-(--text-secondary)" />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-wider text-(--text-secondary)">
                                    Member Rank
                                </label>

                                <div className="rounded-sm border border-(--border-color) bg-(--site-bg) px-3 py-2 text-xs text-(--text-main)">
                                    {isAdmin ? "Administrator" : "Library Member"}
                                </div>
                            </div>
                        </div>

                        <div className="my-6 border-t border-(--border-color)" />

                        <div>
                            <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-wider text-(--text-secondary)">
                                Preferences
                            </h3>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between rounded-sm bg-(--site-bg) px-3 py-2.5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center bg-(--card-bg)">
                                            <Bell className="h-4 w-4 text-(--primary-accent)" />
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-(--text-main)">
                                                Borrowing Alerts
                                            </p>

                                            <p className="text-[9px] text-(--text-secondary)">
                                                Receive notifications for upcoming due dates
                                            </p>
                                        </div>
                                    </div>

                                    <div className="h-3 w-6 rounded-full bg-(--primary-accent)" />
                                </div>

                                <div className="flex items-center justify-between rounded-sm bg-(--site-bg) px-3 py-2.5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center bg-(--card-bg)">
                                            <Eye className="h-4 w-4 text-(--primary-accent)" />
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-(--text-main)">
                                                Public Reading List
                                            </p>

                                            <p className="text-[9px] text-(--text-secondary)">
                                                Allow others to see your collection history
                                            </p>
                                        </div>
                                    </div>

                                    <div className="h-3 w-6 rounded-full bg-(--primary-accent)" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-2">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="cursor-pointer rounded-sm border border-(--border-color) px-4 py-2 text-xs font-medium text-(--text-main) transition-colors hover:bg-(--surface-hover)"
                            >
                                Edit Profile
                            </button>

                            <button
                                onClick={() => deleteUser(user.id!)}
                                disabled={userDeleteMutation.isPending}
                                className="cursor-pointer rounded-sm border border-red-500/30 px-4 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {userDeleteMutation.isPending
                                    ? "Deleting..."
                                    : "Delete Account"}
                            </button>
                        </div>
                    </section>

                    <section className="rounded-md border border-(--border-color) bg-(--card-bg) p-5">
                        <div className="mb-5 flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-(--primary-accent)" />

                            <h2 className="text-sm font-semibold text-(--text-main)">
                                Currently Borrowed
                            </h2>
                        </div>

                        <div className="space-y-3">
                            {borrowedBooks.map((book, index) => (
                                <div
                                    key={index}
                                    className="flex gap-3 rounded-sm border border-(--border-color) bg-(--site-bg) p-2.5"
                                >
                                    <div className="flex h-16 w-12 shrink-0 items-center justify-center border border-(--border-color) bg-(--card-bg)">
                                        <BookOpen className="h-6 w-6 text-(--text-secondary)" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <h3 className="truncate text-xs font-semibold text-(--text-main)">
                                            {book.title}
                                        </h3>

                                        <p className="truncate text-[10px] text-(--text-secondary)">
                                            {book.author}
                                        </p>

                                        <div className="mt-3 h-1 overflow-hidden rounded-full bg-(--surface-hover)">
                                            <div
                                                className={`h-full ${index === 1
                                                    ? "w-4/5 bg-red-400"
                                                    : index === 2
                                                        ? "w-full bg-orange-400"
                                                        : "w-3/5 bg-(--primary-accent)"
                                                    }`}
                                            />
                                        </div>

                                        <p className="mt-1 text-[8px] text-(--text-secondary)">
                                            {book.status}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => navigate("/books")}
                            className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 py-2 text-[10px] font-medium uppercase tracking-wider text-(--primary-accent)"
                        >
                            View History
                            <ArrowRight className="h-3 w-3" />
                        </button>
                    </section>
                </div>

                <section className="rounded-md border border-(--border-color) bg-(--card-bg) p-5">
                    <div className="mb-6 flex items-start justify-between">
                        <div>
                            <h2 className="text-sm font-semibold text-(--text-main)">
                                Library Activity
                            </h2>

                            <p className="mt-1 text-[10px] text-(--text-secondary)">
                                Interaction frequency over the last 6 months
                            </p>
                        </div>

                        <div className="flex gap-1">
                            <button className="border border-(--border-color) px-3 py-1.5 text-[9px] text-(--text-secondary)">
                                WEEK
                            </button>

                            <button className="border border-(--primary-accent) bg-(--primary-accent)/10 px-3 py-1.5 text-[9px] text-(--primary-accent)">
                                MONTH
                            </button>

                            <button className="border border-(--border-color) px-3 py-1.5 text-[9px] text-(--text-secondary)">
                                YEAR
                            </button>
                        </div>
                    </div>

                    <div className="flex h-44 items-end gap-2 border-b border-(--border-color) px-2">
                        {activity.map((value, index) => (
                            <div
                                key={index}
                                className="group flex h-full flex-1 items-end"
                            >
                                <div
                                    className={`relative w-full transition-all ${index === activity.length - 1
                                        ? "bg-(--primary-accent)"
                                        : "bg-(--surface-hover)"
                                        }`}
                                    style={{
                                        height: `${value}%`,
                                    }}
                                >
                                    {index === activity.length - 1 && (
                                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] text-(--text-main)">
                                            JUN: {value}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-2 flex justify-between text-[8px] uppercase text-(--text-secondary)">
                        <span>JAN</span>
                        <span>JUN</span>
                        <span>DEC</span>
                    </div>
                </section>
            </div>

            <EditProfileModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </main>
    );
}