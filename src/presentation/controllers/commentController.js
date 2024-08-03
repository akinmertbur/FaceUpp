import {
  insertComment,
  deleteComment,
} from "../../business/services/commentService.js";
import { log, error } from "../../utils/logger.js";

const addComment = async (req, res) => {
  try {
    const { photoId, userId, comment } = req.body;
    await insertComment(req.user.id, photoId, comment);
    log(`${photoId} is commented by user ${req.user.id}`);
    res.status(200).redirect(`/userProfile/${userId}`);
  } catch (err) {
    error(`Failed to add comment: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const removeComment = async (req, res) => {
  try {
    const { photoId, userId, comment } = req.body;
    await deleteComment(req.user.id, photoId, comment);
    log(
      `The comment is removed from photo ID: ${photoId} by user ID: ${req.user.id}`
    );
    res.status(200).redirect(`/userProfile/${userId}`);
  } catch (err) {
    error(`Failed to remove comment: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

export { addComment, removeComment };
