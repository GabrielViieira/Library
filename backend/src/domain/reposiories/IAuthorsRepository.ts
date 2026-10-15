import { Authors } from "../entities/authors.js";


export interface IAuthors{
    findAll(): Promise<Authors[]>
    findByName(name: string): Promise<Authors[] | null>
    createAuthor(author: Authors): Promise<Authors>
    updateAuthor(id: string, author: Authors): Promise<Authors | null>
    deleteAuthor(id: string): Promise<boolean>
}