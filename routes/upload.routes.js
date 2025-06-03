import express from "express"
import uploadSong from "../config/cloudinary.config.js"

const router = express.Router()

router.post("/", uploadSong.single("song"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No song provided" })
    }

    return res.status(200).json({ songUrl: req.file.path })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: "Error uploading song", error })
  }
})

export default router
