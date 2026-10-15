import { api } from "#lib/axios";
import type { RegisterFormData } from "../schema/register.schema";

export async function register(user: RegisterFormData) {
    const { data } = await api.post("/user/register", user)

    return data
}