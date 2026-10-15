import { useMutation } from "@tanstack/react-query";
import type { UserFormData } from "../schema/user.schema"
import { editUser } from "../api/user.api";


export function useEditUser() {
    return useMutation({
        mutationFn: ({
            id,
            user
        }: {
            id: string,
            user: UserFormData
        }) => editUser(id, user)
    })
}