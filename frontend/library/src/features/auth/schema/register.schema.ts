import { z } from "zod";



export const RegisterSchema = z.object({
    username: z.string("Digite o seu usuario.").min(3, "Minimo 3 caracteres."),
    password: z.string("Digite a senha.").min(5, "A senha deve conter pelo menos 5 digitos."),
    email: z.email("Digite seu email."),
    birth: z.string().min(1, "A data de nascimento é obrigatória")
})

export type RegisterFormData = z.infer<typeof RegisterSchema>