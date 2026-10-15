import { api } from "#lib/axios"
import { UserSchema, type UserFormData } from "../schema/user.schema"
import type { User } from "../type/user.type";

export async function editUser(id: string, user: UserFormData) {
    const { data } = await api.put(`/user/edit/${id}`, user)

    return data
}

export async function deleteUser(id: string) {
    const { data } = await api.delete(`/user/delete/${id}`)

    return data
}

export async function profileUser(username: string) {
    const { data } = await api.get(`/user/${username}`)

    return data
}

export async function listUsers() {
    const { data } = await api.get<User[]>("/user/list")

    return data
}

export async function findUser(id: string) {
    const { data } = await api.get<User>(`/user/find/${id}`)

    return data
}

export async function getMe(): Promise<UserFormData> {
    const token = localStorage.getItem("token")

    const { data } = await api.get("/user/me", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return UserSchema.parse(data)
}

export function isAuthenticated(){
    const token = localStorage.getItem("token")

    return{
        isToken: !!token
    }
}