import { model, Schema, type HydratedDocument, type InferSchemaType } from "mongoose";

const authorSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        biography: {
            type: String
        }
    }
)

export type authorDocument =
    HydratedDocument<InferSchemaType<typeof authorSchema>>

export const AuthorModel = model(
    "author",
    authorSchema
)