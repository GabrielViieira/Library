import { User } from "../../domain/entities/user.js";
import type { IUserRepository } from "../../domain/reposiories/IUserRepository.js";
import { UserModel, type UserDocument } from "../database/models/userModel.js";


function toEntity(user: UserDocument): User {
    return new User(
        {
            id: user.id,
            username: user.username,
            password: user.password,
            email: user.email,
            birth: user.birth,
            role: user.role,
            imageUrl: user.imageUrl || "",
            bio: user.bio || ""
        })
}

export class UserRepository
    implements IUserRepository {

    async findAll(): Promise<User[]> {
        const users = await UserModel.find()

        return users.map(toEntity)
    }

    async findById(
        id: string
    ): Promise<User | null> {

        const user = await UserModel.findById(id)

        if (!user) return null

        return toEntity(user)
    }

    async createUser(
        user: User
    ): Promise<User> {

        const createdUser = await UserModel.create({
            username: user.username,
            email: user.email,
            password: user.password,
            birth: user.birth ?? null
        })

        return toEntity(createdUser)
    }

    async findByEmail(
        email: string
    ): Promise<User | null> {
        const user = await UserModel.findOne({
            email
        })
        if (!user) return null

        return toEntity(user)
    }

    async updateUser(
        id: string,
        user: User
    ): Promise<User | null> {

        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            user,
            { returnDocument: 'after' }
        )

        if (!updatedUser) return null

        return toEntity(updatedUser)
    }

    async deleteUser(
        id: string
    ): Promise<boolean> {

        const deletedUser = await UserModel.findByIdAndDelete(id)

        return !!deletedUser
    }

    async findUsername(
        username: string
    ): Promise<User> {
        const usernameUser = await UserModel.findOne({ username })

        return toEntity(usernameUser!)
    }
}