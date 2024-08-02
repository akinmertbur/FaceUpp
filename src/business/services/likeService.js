import {
  like,
  unlike,
  getLikeInfo,
  getLikesByPhoto,
} from "../../data/repositories/likeRepository.js";

const likePhoto = async (userId, photoId) => {
  try {
    if (!userId || !photoId) {
      throw new Error("IDs required for user and photo!");
    }

    return await like(userId, photoId);
  } catch (err) {
    throw new Error(`Failed to like the photo: ${err.message}`);
  }
};

const unlikePhoto = async (userId, photoId) => {
  try {
    if (!userId || !photoId) {
      throw new Error("IDs required for user and photo!");
    }

    return await unlike(userId, photoId);
  } catch (err) {
    throw new Error(`Failed to unlike the photo: ${err.message}`);
  }
};

const retrieveLikeInfo = async (userId, photoId) => {
  try {
    if (!userId || !photoId) {
      throw new Error("IDs required for user and photo!");
    }

    return await getLikeInfo(userId, photoId);
  } catch (err) {
    throw new Error(`Failed to retrieve like info: ${err.message}`);
  }
};

const retrieveLikesByPhoto = async (photoId) => {
  try {
    if (!photoId) {
      throw new Error("Photo ID is required!");
    }

    return await getLikesByPhoto(photoId);
  } catch (err) {
    throw new Error(`Failed to retrieve likes by photo: ${err.message}`);
  }
};

export { likePhoto, unlikePhoto, retrieveLikeInfo, retrieveLikesByPhoto };
