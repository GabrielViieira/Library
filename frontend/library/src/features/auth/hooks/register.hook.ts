import { useMutation } from "@tanstack/react-query"
import { register } from "../api/register.api";
import type { RegisterFormData } from "../schema/register.schema";

export function useRegister() {
    return useMutation({
        mutationFn: (user: RegisterFormData) => register(user),
    })
}