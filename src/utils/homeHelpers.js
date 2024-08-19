// src/utils/homeHelpers.js
"use strict";
import { retrieveFollowings } from "../business/services/followService.js";
import {
  retrievePhotos,
  downloadPhotos,
} from "../business/services/photoService.js";
import {
  getLikesByPhotoUserDetails,
  getCommentsByPhoto,
  getCommentsByPhotoUserDetails,
  getLikeDetails,
} from "../utils/profileHelpers.js";
import { error } from "../utils/logger.js";

const getFollowingsPhotos = async (userId) => {
  try {
    const followings = await retrieveFollowings(userId);

    const photosPromises = followings.map(async (following) => {
      const photos = await retrievePhotos(following.followedId);
      return photos.length > 0 ? photos : [];
    });

    const photos = (await Promise.all(photosPromises)).flat();

    return photos;
  } catch (err) {
    error(`Failed to get followings photos: ${err.message}`);
    throw new Error("Error getting followings photos");
  }
};

const getFollowingsPhotosContent = async (photos) => {
  try {
    const localPhotos = await downloadPhotos(photos);
    return localPhotos;
  } catch (err) {
    error(`Failed to get followings photos content: ${err.message}`);
    throw new Error("Error getting followings photos content");
  }
};

const getHomeData = async (user, photos, localPhotos) => {
  const likesByPhotoUserDetails = await getLikesByPhotoUserDetails(photos);
  const commentsByPhoto = await getCommentsByPhoto(photos);
  const commentsByPhotoUserDetails = await getCommentsByPhotoUserDetails(
    photos
  );
  const likeDetails = await getLikeDetails(user.id, photos);

  return {
    photos: localPhotos,
    photos_info: photos,
    likesByPhotoUserDetails,
    commentsByPhoto,
    commentsByPhotoUserDetails,
    likeDetails,
    user,
    username: user.username,
  };
};

export { getFollowingsPhotos, getFollowingsPhotosContent, getHomeData };
