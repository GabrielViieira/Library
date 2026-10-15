import {
    model,
    Schema,
    type InferSchemaType,
    type HydratedDocument
} from "mongoose";

const bookSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "author",
        required: true
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: "categories"
    }]
});

export type BookDocument =
    HydratedDocument<InferSchemaType<typeof bookSchema>>;

export const BookModel = model(
    "Book",
    bookSchema,
    "books"
);