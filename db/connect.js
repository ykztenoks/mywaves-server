import mongoose from "mongoose"

export default async function connectDB() {
  try {
    const connection = await mongoose.connect(
      "mongodb://127.0.0.1:27017/mywaves-db"
    )

    console.log("connected to db: ", connection.connection.name)
  } catch (error) {
    console.log("error connecting to db: ", error)
  }
}
