import {
  addComment,
  removeComment,
  getCommentInfo,
  getCommentsByPhoto,
} from "../../data/repositories/commentRepository.js";

const insertComment = async (userId, photoId, comment) => {
  try {
    if (!userId || !photoId || !comment) {
      throw new Error("user ID, photo ID and comment is required!");
    }

    return await addComment(userId, photoId, comment);
  } catch (err) {
    throw new Error(`Failed to add comment to the photo: ${err.message}`);
  }
};

const deleteComment = async (userId, photoId, comment) => {
  try {
    if (!userId || !photoId || !comment) {
      throw new Error("user ID, photo ID and comment is required!");
    }

    return await removeComment(userId, photoId, comment);
  } catch (err) {
    throw new Error(`Failed to remove comment from the photo: ${err.message}`);
  }
};

const retrieveCommentInfo = async (userId, photoId, comment) => {
  try {
    if (!userId || !photoId || !comment) {
      throw new Error("user ID, photo ID and comment is required!");
    }

    return await getCommentInfo(userId, photoId, comment);
  } catch (err) {
    throw new Error(`Failed to retrieve comment info: ${err.message}`);
  }
};

const retrieveCommentsByPhoto = async (photoId) => {
  try {
    if (!photoId) {
      throw new Error("Photo ID is required!");
    }

    return await getCommentsByPhoto(photoId);
  } catch (err) {
    throw new Error(`Failed to retrieve comments by photo: ${err.message}`);
  }
};

export {
  insertComment,
  deleteComment,
  retrieveCommentInfo,
  retrieveCommentsByPhoto,
};
