import { model, Schema, type HydratedDocument, type InferSchemaType } from "mongoose";


const CategorySchema = new Schema(
    {
        category: {
            type: String,
            unique: true,
            required: true
        }
    }
)

export type CategoryDocument =
    HydratedDocument<InferSchemaType<typeof CategorySchema>>

export const CategoryModel = model(
    "categories",
    CategorySchema
)