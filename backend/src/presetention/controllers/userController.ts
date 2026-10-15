import type { Request, Response } from "express";
import type { findAllUsersUseCase } from "../../domain/usecases/user/findAllUseCase.js";
import type { findByIdUseCase } from "../../domain/usecases/user/findByIdUseCases.js";
import type { createUserUseCase } from "../../domain/usecases/user/createUserUseCase.js";
import type { updateUserUseCase } from "../../domain/usecases/user/updateUserUseCase.js";
import type { deleteUserUseCase } from "../../domain/usecases/user/deleteUserUseCase.js";
import type { loginUseCase } from "../../domain/usecases/user/loginUserUseCase.js";
import type { GetMeUseCase } from "../../domain/usecases/user/getMeUsecase.js";
import type { findUsername } from "../../domain/usecases/user/findUsernameUseCase.js";

export class UserController {
    constructor(
        private readonly findAllUsersUseCase: findAllUsersUseCase,
        private readonly findUserByIdUseCase: findByIdUseCase,
        private readonly createUserUseCase: createUserUseCase,
        private readonly loginUseCase: loginUseCase,
        private readonly updateUserUseCase: updateUserUseCase,
        private readonly deleteUserUseCase: deleteUserUseCase,
        private readonly getMeUseCase: GetMeUseCase,
        private readonly FindUsername: findUsername
    ) { }

    async findAll(req: Request, res: Response) {
        const users = await this.findAllUsersUseCase.execute()

        if (!users) return res.status(404).json({ message: "Error finding users" })

        return res.status(200).json(users)
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Invalid ID"
            });
        }
        const users = await this.findUserByIdUseCase.execute(id)

        return res.status(200).json(users)
    }

    async createUser(req: Request, res: Response) {
        const createdUser = await this.createUserUseCase.execute(req.body)

        return res.status(201).json(createdUser)
    }

    async login(
        req: Request,
        res: Response
    ) {
        const { email, password } = req.body;

        const result =
            await this.loginUseCase.execute(
                email,
                password
            )

        return res.status(200).json(result);
    }

    async updateUser(req: Request, res: Response) {
        const { id } = req.params
        const user = req.body

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Invalid User"
            })
        }

        const updatedUser = await this.updateUserUseCase.execute(id, user)

        return res.status(200).json(updatedUser)
    }

    async deleteUser(req: Request, res: Response) {
        const { id } = req.params
        if (!id || Array.isArray(id)) {
            return res.status(404).json({
                message: "Invalid ID"
            });
        }
        await this.deleteUserUseCase.execute(id)
        return res.status(200).json({
            success: "deleted"
        })
    }

    async handle(req: Request, res: Response) {

        if (!req.user!.id) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const user = await this.getMeUseCase.execute(
            req.user!.id
        )

        return res.status(200).json(user)
    }

    async findUsername(req: Request, res: Response): Promise<Response> {
        const { username } = req.params as { username: string }

        if (!username) {
            return res.status(400).json({ error: "Nome de usuário é obrigatório." });
        }

        const user = await this.FindUsername.execute(username)

        if (!user) {
            return res.status(404).json({ error: `Usuário @${username} não encontrado.` });
        }

        return res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            birth: user.birth,
            imageUrl: user.imageUrl,
            bio: user.bio,
        }).status(200)
    }
}