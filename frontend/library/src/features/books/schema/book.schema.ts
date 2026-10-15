import { z } from 'zod';

const objectIdSchema = z.union([
    z.string().regex(/^[0-9a-fA-F]{24}$/, "ID inválido")
])

export const bookSchema = z.object({
    id: z.string().optional(),

    title: z.string().min(5, "O título é obrigatório"),

    pages: z.number().int().positive("A quantidade de páginas precisa ser maior que zero"),

    author: objectIdSchema,

    categories: z.array(objectIdSchema).min(1, "Selecione pelo menos uma categoria"),

    imageUrl: z.string().optional()
})

export type BookDataForm = z.infer<typeof bookSchema>