import { Schema, model } from "mongoose"

const UserSchema = new Schema(
  {
    username: { type: String, minLength: 4, maxLength: 26, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    genres: [String],
    bio: { type: String, minLength: 14, maxLength: 600 },
    avatarUrl: {
      type: String,
      default:
        "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg",
    },
  },
  {
    timestamps: true,
  }
)

export default model("User", UserSchema)
