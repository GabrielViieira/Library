import { useQuery } from "@tanstack/react-query";
import { listUsers } from "../api/user.api";



export function useListUsers(){
    return useQuery({
        queryKey:["users"],
        queryFn: listUsers
    })
}