import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthUser } from "../hooks/fetchUser.hook";
import type { UserFormData } from "../schema/user.schema";
import { useEditUser } from "../hooks/editUser.hook";

const editProfileSchema = z.object({
    username: z.string().min(3, "O nome precisa de pelo menos 3 caracteres"),
    email: z.email("Digite um email valido."),
    bio: z.string().max(160, "A bio pode ter no máximo 160 caracteres").optional(),
    imageUrl: z.url("Insira uma URL válida para a imagem").or(z.literal("none")),
});

type EditProfileInput = z.infer<typeof editProfileSchema>;

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function EditProfileModal({
    isOpen,
    onClose,
}: EditProfileModalProps) {
    const queryClient = useQueryClient();
    const { data: user } = useAuthUser();
    const userEditMutation = useEditUser();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<EditProfileInput>({
        resolver: zodResolver(editProfileSchema),
    });

    useEffect(() => {
        if (isOpen && user) {
            reset({
                username: user.username,
                email: user.email,
                bio: user.bio || "",
                imageUrl: user.imageUrl!,
            });
        }
    }, [isOpen, user, reset]);

    function editUser(id: string, data: UserFormData) {
        userEditMutation.mutate(
            { id, user: data },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ["authUser"],
                    });
                    onClose();
                },
            }
        );
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-xl border border-(--border-color) bg-(--card-bg) p-6 shadow-2xl">

                <div className="mb-6 border-b border-(--border-color) pb-4">
                    <h2 className="text-xl font-semibold text-(--text-main)">
                        Edit Profile
                    </h2>

                    <p className="mt-1 text-sm text-(--text-secondary)">
                        Update your account information and profile details.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit((data) =>
                        editUser(user?.id || "", data)
                    )}
                    className="space-y-5"
                >
                    <div className="space-y-2">
                        <label
                            htmlFor="username"
                            className="text-xs font-semibold uppercase tracking-wide text-(--text-secondary)"
                        >
                            Username
                        </label>

                        <input
                            id="username"
                            {...register("username")}
                            className="w-full rounded-md border border-(--border-color) bg-(--site-bg) px-3 py-2.5 text-sm text-(--text-main) outline-none transition focus:border-(--primary-accent) focus:ring-1 focus:ring-(--primary-accent)"
                        />

                        {errors.username && (
                            <p className="text-xs text-red-400">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="text-xs font-semibold uppercase tracking-wide text-(--text-secondary)"
                        >
                            Email Address
                        </label>

                        <input
                            id="email"
                            type="email"
                            {...register("email")}
                            className="w-full rounded-md border border-(--border-color) bg-(--site-bg) px-3 py-2.5 text-sm text-(--text-main) outline-none transition focus:border-(--primary-accent) focus:ring-1 focus:ring-(--primary-accent)"
                        />

                        {errors.email && (
                            <p className="text-xs text-red-400">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="imageUrl"
                            className="text-xs font-semibold uppercase tracking-wide text-(--text-secondary)"
                        >
                            Profile Image URL
                        </label>

                        <input
                            id="imageUrl"
                            {...register("imageUrl")}
                            className="w-full rounded-md border border-(--border-color) bg-(--site-bg) px-3 py-2.5 text-sm text-(--text-main) outline-none transition focus:border-(--primary-accent) focus:ring-1 focus:ring-(--primary-accent)"
                        />

                        {errors.imageUrl && (
                            <p className="text-xs text-red-400">
                                {errors.imageUrl.message}
                            </p>
                        )}
                    </div>
                    <div className="flex justify-end gap-3 border-t border-(--border-color) pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer rounded-md border border-(--border-color) bg-(--site-bg) px-4 py-2 text-sm font-medium text-(--text-secondary) transition hover:bg-(--surface-hover) hover:text-(--text-main)"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={userEditMutation.isPending}
                            className="cursor-pointer rounded-md bg-(--primary-accent) px-5 py-2 text-sm font-semibold text-(--text-on-accent) transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {userEditMutation.isPending
                                ? "Saving..."
                                : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}