import { Schema, model } from "mongoose"

const trackSchema = new Schema(
  {
    title: { type: String, required: true, maxLength: 80 },
    description: { type: String, maxLength: 500 },
    fileUrl: { type: String, required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
    releaseDate: { type: Date, default: Date.now() },
    duration: { type: Number, max: 3600 },
  },
  {
    timestamps: true,
  }
)

export default model("Track", trackSchema)
