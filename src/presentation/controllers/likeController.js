import { likePhoto, unlikePhoto } from "../../business/services/likeService.js";
import { log, error } from "../../utils/logger.js";

const like = async (req, res) => {
  try {
    const { photoId, userId } = req.body;
    await likePhoto(req.user.id, photoId);
    log(`${photoId} is liked by user ${req.user.id}`);
    res.status(200).redirect(`/userProfile/${userId}`);
  } catch (err) {
    error(`Failed to like: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const unlike = async (req, res) => {
  try {
    const { photoId, userId } = req.body;
    await unlikePhoto(req.user.id, photoId);
    log(`${photoId} is unliked by user ${req.user.id}`);
    res.status(200).redirect(`/userProfile/${userId}`);
  } catch (err) {
    error(`Failed to unlike: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

export { like, unlike };
