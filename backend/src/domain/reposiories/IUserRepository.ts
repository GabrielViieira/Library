import type { User } from "../entities/user.js";

export interface IUserRepository{
    findAll(): Promise<User[]>
    findById(id: string): Promise<User | null>
    createUser(user: User): Promise<User>
    findByEmail(email: string): Promise<User | null>
    updateUser(id: string, user: User): Promise<User | null>
    deleteUser(id: string): Promise<boolean>
    findUsername(username: string): Promise<User>
}