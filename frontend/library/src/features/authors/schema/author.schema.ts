import { z } from "zod";


export const AuthorSchema = z.object({
    id: z.string().optional(),
    name: z.string().max(30),
    biography: z.string().max(150)
})

export type AuthorDataForm = z.infer<typeof AuthorSchema>