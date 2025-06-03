import Track from "../models/track.model.js"

export default async function isOwner(req, res, next) {
  try {
    const track = await Track.findById(req.params.id)
    if (req.user._id !== String(track.uploadedBy)) {
      return res.status(401).json({ msg: "You are not authorized" })
    }

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: "error in isOwner mid", error })
  }
}
