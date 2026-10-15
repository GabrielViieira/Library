export interface CreateUserData {
    username: string
    password: string
    email: string
    birth: Date
    role?: string
    imageUrl?: string
    bio?: string
}