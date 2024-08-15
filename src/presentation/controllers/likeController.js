import { likePhoto, unlikePhoto } from "../../business/services/likeService.js";
import { findUserById } from "../../business/services/authService.js";
import { log, error } from "../../utils/logger.js";

const like = async (req, res) => {
  try {
    const { photoId, userId } = req.body;
    const result = await likePhoto(req.user.id, photoId);
    log(`${photoId} is liked by user ${req.user.id}`);
    const user = await findUserById(req.user.id);
    res.status(200).json({ user });
  } catch (err) {
    error(`Failed to like: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const unlike = async (req, res) => {
  try {
    const { photoId, userId } = req.body;
    const result = await unlikePhoto(req.user.id, photoId);
    log(`${photoId} is unliked by user ${req.user.id}`);
    const user = await findUserById(req.user.id);
    res.status(200).json({ user });
  } catch (err) {
    error(`Failed to unlike: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

export { like, unlike };
