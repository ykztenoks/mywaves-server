import express from "express"
import connectDB from "./db/connect.js"
import authRouter from "./routes/auth.routes.js"
import trackRouter from "./routes/track.routes.js"
import projectRouter from "./routes/project.routes.js"
import uploadRouter from "./routes/upload.routes.js"
import morgan from "morgan"
import cors from "cors"
import * as dotenv from "dotenv"

dotenv.config()
const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

app.use("/user", authRouter)
app.use("/track", trackRouter)
app.use("/project", projectRouter)
app.use("/upload", uploadRouter)

app.listen(8080, () => {
  console.clear()
  console.log("Server up and running on port: 8080")

  connectDB()
})
