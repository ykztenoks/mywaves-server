import { Schema, model } from "mongoose"

const projectSchema = new Schema(
  {
    name: { type: String, maxLength: 80, require: true },
    albumImage: { type: String },
    description: { type: String, maxLength: 500, require: true },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    contributors: [{ type: Schema.Types.ObjectId, ref: "User" }],
    tracks: [{ type: Schema.Types.ObjectId, ref: "Track" }],
    status: { type: String, enum: ["not started", "ongoing", "finished"] },
  },
  {
    timestamps: true,
  }
)

export default model("Project", projectSchema)
