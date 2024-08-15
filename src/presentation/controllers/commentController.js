import { findUserById } from "../../business/services/authService.js";
import {
  insertComment,
  deleteComment,
} from "../../business/services/commentService.js";
import { log, error } from "../../utils/logger.js";

const addComment = async (req, res) => {
  try {
    const { photoId, userId, comment } = req.body;
    const result = await insertComment(req.user.id, photoId, comment);
    log(`${photoId} is commented by user ${req.user.id}`);
    const user = await findUserById(req.user.id);
    res.status(200).json({ user, comment });
  } catch (err) {
    error(`Failed to add comment: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const removeComment = async (req, res) => {
  try {
    const { photoId, userId, comment } = req.body;
    const result = await deleteComment(userId, photoId, comment);
    log(
      `The comment is removed from photo ID: ${photoId} by user ID: ${req.user.id}`
    );
    const user = await findUserById(userId);
    res.status(200).json({ user, comment });
  } catch (err) {
    error(`Failed to remove comment: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

export { addComment, removeComment };
