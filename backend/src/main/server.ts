import express from "express"
import cors from "cors"
import { connectDB } from "../infrastructure/database.js";
import { router } from "./routes/index.js";


const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

const PORT = process.env.PORT


async function TurnOnServer() {
    await connectDB()

    app.listen(PORT, () => {
        console.log("servidor iniciado na porta: ", PORT)
    })
}

TurnOnServer()