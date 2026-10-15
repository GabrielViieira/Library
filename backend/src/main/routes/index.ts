import { Router } from "express"

import { userRoutes } from "./userRoutes.js"
import { authorRoute } from "./authorRoutes.js";
import { CategoryRoute } from "./categoryRoutes.js";
import { bookRoute } from "./bookRoutes.js";

const router = Router()

router.use("/user", userRoutes)
router.use("/author", authorRoute)
router.use("/category", CategoryRoute)
router.use("/books", bookRoute)
// router.use("/hires", hireRoutes)

export { router }