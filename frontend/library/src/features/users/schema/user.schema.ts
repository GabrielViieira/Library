import { z } from "zod";



export const UserSchema = z.object({
    id: z.string().optional(),
    username: z.string("O Username deve conter 3 caracteres.").min(3),
    email: z.email("Digite um email valido."),
    birth: z.string("Digite uma data valida.").min(1).optional(),
    role: z.array(z.string()).optional(),
    imageUrl:z.url().catch('none').optional(),
    bio:z.string().max(150).optional()
})
export type UserFormData = z.infer<typeof UserSchema>