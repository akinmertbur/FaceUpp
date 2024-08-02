import Like from "../models/likeModel.js";

const like = async (userId, photoId) => {
  return await Like.create({ userId, photoId });
};

const unlike = async (userId, photoId) => {
  const row = await Like.findOne({
    where: { userId, photoId },
  });
  if (row) {
    await row.destroy(); // deletes the row
  }
};

const getLikeInfo = async (userId, photoId) => {
  return await Like.findOne({
    where: { userId, photoId },
  });
};

const getLikesByPhoto = async (photoId) => {
  return await Like.findAll({
    where: { photoId },
  });
};

export { like, unlike, getLikeInfo, getLikesByPhoto };
