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
import { findUserById } from "../business/services/authService.js";
import { error } from "../utils/logger.js";
import { getProfilePicture } from "../utils/profileHelpers.js";

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

const getUserDetailByPhoto = async (photos) => {
  try {
    const users = await Promise.all(
      photos.map(async (photo) => {
        return await findUserById(photo.userId);
      })
    );

    return users;
  } catch (err) {
    error(`Failed to get user detail by photo: ${err.message}`);
    throw new Error("Error getting user detail by photo");
  }
};

const getProfilePicturesForAllUsers = async (users) => {
  try {
    const profilePictures = await Promise.all(
      users.map(async (user) => {
        return await getProfilePicture(user.id);
      })
    );

    return profilePictures;
  } catch (err) {
    error(`Failed to get profile pictures for all users: ${err.message}`);
    throw new Error("Error getting profile pictures for all users");
  }
};

const getHomeData = async (user) => {
  try {
    const photos = await getFollowingsPhotos(user.id);
    const localPhotos = await getFollowingsPhotosContent(photos);
    const likesByPhotoUserDetails = await getLikesByPhotoUserDetails(photos);
    const commentsByPhoto = await getCommentsByPhoto(photos);
    const commentsByPhotoUserDetails = await getCommentsByPhotoUserDetails(
      photos
    );
    const likeDetails = await getLikeDetails(user.id, photos);
    const userDetails = await getUserDetailByPhoto(photos);
    const profilePictures = await getProfilePicturesForAllUsers(userDetails);

    return {
      photos: localPhotos,
      photos_info: photos,
      likesByPhotoUserDetails,
      commentsByPhoto,
      commentsByPhotoUserDetails,
      likeDetails,
      user,
      userDetails,
      profilePictures,
    };
  } catch (err) {
    error(`Failed to gather homepage data: ${err.message}`);
    throw new Error("Error gathering homepage data");
  }
};

export { getHomeData };
