import { createAuthorsUseCase } from "../../../domain/usecases/authors/createUseCase.js";
import { deleteAuthorsUseCase } from "../../../domain/usecases/authors/deleteUseCase.js";
import { findAllAuthorsUseCase } from "../../../domain/usecases/authors/findAllUseCase.js";
import { findByNameAuthorsUseCase } from "../../../domain/usecases/authors/findByNameUseCase.js";
import { updateAuthorsUseCase } from "../../../domain/usecases/authors/updateUseCase.js";
import { AuthorRepository } from "../../../infrastructure/repositories/mongoAuthorRepo.js";
import { AuthorsController } from "../../../presetention/controllers/authorController.js";




export function makeAuthorController(){
    const repository = new AuthorRepository()

    const FindAllAuthorUseCase = new findAllAuthorsUseCase(repository)

    const FindByNameAuthorUseCase = new findByNameAuthorsUseCase(repository)

    const CreateAuthorUseCase = new createAuthorsUseCase(repository)

    const UpdateAuthorUseCase = new updateAuthorsUseCase(repository)

    const DeleteAuthorUseCase = new deleteAuthorsUseCase(repository)

    return new AuthorsController(
        FindAllAuthorUseCase,
        FindByNameAuthorUseCase,
        CreateAuthorUseCase,
        UpdateAuthorUseCase,
        DeleteAuthorUseCase
    )
}