import express from "express"
import Project from "../models/project.model.js"
import isAuth from "../middlewares/auth.middleware.js"
import isOwnerProject from "../middlewares/isOwnerProject.js"

const router = express.Router()

router.post("/", isAuth, async (req, res) => {
  try {
    const { name, albumImage, description, contributors, tracks, status } =
      req.body

    const created = await Project.create({
      name,
      albumImage,
      description,
      contributors,
      tracks,
      status,
      creator: req.user._id,
    })

    return res.status(201).json(created)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

router.put("/:id", isAuth, isOwnerProject, async (req, res) => {
  try {
    const { name, albumImage, description, contributors, tracks, status } =
      req.body
    const updated = {
      name,
      albumImage,
      description,
      contributors,
      tracks,
      status,
    }
    const { id } = req.params

    for (let key in updated) {
      if (updated[key] === undefined) {
        delete updated[key]
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(id, updated, {
      new: true,
      runValidators: true,
    })
    return res.status(200).json(updatedProject)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("tracks")
      .populate("creator")
      .populate({ path: "tracks", populate: { path: "uploadedBy" } })

    return res.status(200).json(projects)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const album = await Project.findById(id)
      .populate("tracks")
      .populate("creator")
      .populate({ path: "tracks", populate: { path: "uploadedBy" } })

    return res.status(200).json(album)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.delete("/:id", isAuth, isOwnerProject, async (req, res) => {
  try {
    const { id } = req.params

    await Project.findByIdAndDelete(id)

    return res.status(200).json({ msg: "Album deleted successfuly" })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

export default router
