import Comment from "../models/commentModel.js";

const addComment = async (userId, photoId, comment) => {
  return await Comment.create({ userId, photoId, comment });
};

const removeComment = async (userId, photoId, comment) => {
  const row = await Comment.findOne({
    where: { userId, photoId, comment },
  });
  if (row) {
    await row.destroy(); // deletes the row
  }
};

const getCommentInfo = async (userId, photoId, comment) => {
  return await Comment.findOne({
    where: { userId, photoId, comment },
  });
};

const getCommentsByPhoto = async (photoId) => {
  return await Comment.findAll({
    where: { photoId },
  });
};

export { addComment, removeComment, getCommentInfo, getCommentsByPhoto };
