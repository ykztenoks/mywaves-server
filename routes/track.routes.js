import express from "express"
import Track from "../models/track.model.js"
import isAuth from "../middlewares/auth.middleware.js"
import isOwner from "../middlewares/isOwner.js"

const router = express.Router()

router.post("/", isAuth, async (req, res) => {
  try {
    const { title, fileUrl, releaseDate, duration, description } = req.body

    const createdTrack = await Track.create({
      title,
      fileUrl,
      uploadedBy: req.user._id,
      releaseDate,
      duration,
      description,
    })

    return res.status(201).json(createdTrack)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

router.get("/", async (req, res) => {
  try {
    const tracks = await Track.find()

    return res.status(200).json(tracks)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const track = await Track.findById(id)

    return res.status(200).json(track)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

router.put("/:id", isAuth, isOwner, async (req, res) => {
  try {
    const { title, fileUrl, description, releaseDate, duration } = req.body
    const { id } = req.params
    const updated = { title, fileUrl, description, releaseDate, duration }
    for (let key in updated) {
      if (updated[key] === undefined) {
        delete updated[key]
      }
    }

    const updatedTrack = await Track.findByIdAndUpdate(id, updated, {
      new: true,
      runValidators: true,
    })

    return res.status(200).json(updatedTrack)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

router.delete("/:id", isAuth, isOwner, async (req, res) => {
  try {
    const { id } = req.params
    await Track.findByIdAndDelete(id)

    return res.status(200).json({ msg: "Deleted succesfully" })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

export default router
