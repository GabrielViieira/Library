import { z } from "zod"


export const CategorySchema = z.object({
    id: z.string().optional(),
    category: z.string("Digite um nome valido e unico.").nonempty("Coloque um nome").min(3, "Minimo de 3 caracteres")
})

export type CategoryFormData = z.infer<typeof CategorySchema>