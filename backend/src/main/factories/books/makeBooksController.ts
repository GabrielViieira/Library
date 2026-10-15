import { createBooksUseCase } from "../../../domain/usecases/books/createtBookUseCase.js";
import { deleteBooksUseCase } from "../../../domain/usecases/books/deleteBookUseCase.js";
import { findAllBooksUseCase } from "../../../domain/usecases/books/findAllUseCase.js";
import { findAuthorUseCase } from "../../../domain/usecases/books/findAuthorUseCase.js";
import { findCategoryUseCase } from "../../../domain/usecases/books/findCategoryUseCase.js";
import { updateBooksUseCase } from "../../../domain/usecases/books/updateBookUseCase.js";
import { BookRepository } from "../../../infrastructure/repositories/mongoBooksRepo.js";
import { BooksController } from "../../../presetention/controllers/bookController.js";


export function makeBookController(){
    const repository = new BookRepository()

    const FindAllBookUseCase = new findAllBooksUseCase(repository)

    const FindAuthorUseCase = new findAuthorUseCase(repository)
    
    const FindCategoryUseCase = new findCategoryUseCase(repository)

    const CreateBookUseCase = new createBooksUseCase(repository)

    const UpdateBookUseCase = new updateBooksUseCase(repository)

    const DeleteBookUseCase = new deleteBooksUseCase(repository)

    return new BooksController(
        FindAllBookUseCase,
        FindAuthorUseCase,
        FindCategoryUseCase,
        CreateBookUseCase,
        UpdateBookUseCase,
        DeleteBookUseCase
    )
}