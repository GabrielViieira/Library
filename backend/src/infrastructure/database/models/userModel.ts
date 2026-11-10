import { Schema, model, type HydratedDocument, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    birth: {
      type: Date,
      default: "0/0/01"
    },
    role: {
      type: [String],
      enum: ["admin", "user"],
      default: ["user"]
    },
    imageUrl:{
      type: String,
      default: ""
    },
    bio:{
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);
export type UserDocument =
    HydratedDocument<InferSchemaType<typeof userSchema>>
export const UserModel = model(
  "users",
  userSchema
);