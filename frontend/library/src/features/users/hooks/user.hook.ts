import { useQuery } from "@tanstack/react-query";
import { findUser } from "../api/user.api";



export function useFindUser(id: string){
    return useQuery({
        queryKey:["user", id],
        queryFn: () => findUser(id),
        enabled: !!id
    })
}