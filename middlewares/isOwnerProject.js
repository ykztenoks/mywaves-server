import Project from "../models/project.model.js"

export default async function isOwnerProject(req, res, next) {
  try {
    const project = await Project.findById(req.params.id)
    if (req.user._id !== String(project.creator)) {
      return res.status(401).json({ msg: "You are not authorized" })
    }

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: "error in isOwner mid", error })
  }
}
