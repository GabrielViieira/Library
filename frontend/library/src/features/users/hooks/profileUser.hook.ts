import { useQuery } from "@tanstack/react-query";
import { profileUser } from "../api/user.api";



export function profileUserHook(username: string) {
    return useQuery({
        queryKey: ["userProfile"],
        queryFn: () => profileUser(username),
        enabled: !!username
    })
}