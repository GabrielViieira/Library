import { Router } from "express"
import { makeUserController } from "../factories/user/makeUserController.js"
import { authMiddleware } from "../../presetention/middlewares/AuthMiddleware.js";
import { adminMiddleware } from "../../presetention/middlewares/adminMiddleware.js";

const router = Router()

const userController = makeUserController()

router.get(
    "/list",
    authMiddleware,
    adminMiddleware,
    userController.findAll.bind(userController)
)

router.get(
    "/find/:id",
    authMiddleware,
    adminMiddleware,
    userController.findById.bind(userController)
)

router.post(
    "/register",
    userController.createUser.bind(userController)
)

router.post(
    "/login",
    userController.login.bind(userController)
)

router.get(
    "/me",
    authMiddleware,
    userController.handle.bind(userController)
)

router.put(
    "/edit/:id",
    authMiddleware,
    userController.updateUser.bind(userController)
)

router.delete(
    "/delete/:id",
    authMiddleware,
    userController.deleteUser.bind(userController)
)

router.get(
    "/:username",
    authMiddleware,
    userController.findUsername.bind(userController)
)

export { router as userRoutes }