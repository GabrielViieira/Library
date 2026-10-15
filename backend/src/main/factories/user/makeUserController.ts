import { createUserUseCase } from "../../../domain/usecases/user/createUserUseCase.js";
import { deleteUserUseCase } from "../../../domain/usecases/user/deleteUserUseCase.js";
import { findAllUsersUseCase } from "../../../domain/usecases/user/findAllUseCase.js";
import { findByIdUseCase } from "../../../domain/usecases/user/findByIdUseCases.js";
import { findUsername } from "../../../domain/usecases/user/findUsernameUseCase.js";
import { GetMeUseCase } from "../../../domain/usecases/user/getMeUsecase.js";
import { loginUseCase } from "../../../domain/usecases/user/loginUserUseCase.js";
import { updateUserUseCase } from "../../../domain/usecases/user/updateUserUseCase.js";
import { BcryptHasher } from "../../../infrastructure/cryptography/bcryptHasher.js";
import { JwtTokenService } from "../../../infrastructure/cryptography/JwtTokenService.js";

import { UserRepository } from "../../../infrastructure/repositories/mongoUserRepo.js";
import { UserController } from "../../../presetention/controllers/userController.js";



export function makeUserController() {
    const repository = new UserRepository()

    const hasher = new BcryptHasher()

    const tokenService = new JwtTokenService()

    const FindAllUsersUseCase = new findAllUsersUseCase(repository)

    const FindByIdUseCase = new findByIdUseCase(repository)

    const CreateUserUseCase = new createUserUseCase(repository, hasher)

    const LoginUserUseCase = new loginUseCase(repository, hasher, tokenService)

    const UpdateUserUseCase = new updateUserUseCase(repository)

    const DeleteUserUseCase = new deleteUserUseCase(repository)

    const getMeUseCase = new GetMeUseCase(repository)
    
    const FindUsername = new findUsername(repository)

    return new UserController(
        FindAllUsersUseCase,
        FindByIdUseCase,
        CreateUserUseCase,
        LoginUserUseCase,
        UpdateUserUseCase,
        DeleteUserUseCase,
        getMeUseCase,
        FindUsername
    )
}