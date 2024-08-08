// src/utils/profileHelpers.js
import { findUserById } from "../business/services/authService.js";
import {
  retrieveFollowers,
  retrieveFollowings,
} from "../business/services/followService.js";
import {
  retrieveLikeInfo,
  retrieveLikesByPhoto,
} from "../business/services/likeService.js";
import { retrieveCommentsByPhoto } from "../business/services/commentService.js";
import { downloadProfilePicture } from "../business/services/photoService.js";
import { retrieveProfilePicture } from "../business/services/userService.js";
import { error } from "./logger.js";

// getFollowersDetail returns the user details of followers
const getFollowersDetail = async (userId) => {
  try {
    const followers = await retrieveFollowers(userId);
    return Promise.all(
      followers.map(async (follow) => {
        return await findUserById(follow.followerId);
      })
    );
  } catch (err) {
    error(`Failed to get followers detail: ${err.message}`);
    throw new Error("Error retrieving followers detail.");
  }
};

// getFollowingsDetail returns the user details of followings
const getFollowingsDetail = async (userId) => {
  try {
    const followings = await retrieveFollowings(userId);
    return Promise.all(
      followings.map(async (follow) => {
        return await findUserById(follow.followedId);
      })
    );
  } catch (err) {
    error(`Failed to get followings detail: ${err.message}`);
    throw new Error("Error retrieving followings detail.");
  }
};

// getLikeDetails determines whether the photos are liked by the user or not
const getLikeDetails = async (userId, photos) => {
  try {
    return Promise.all(
      photos.map(async (photo) => {
        return await retrieveLikeInfo(userId, photo.id);
      })
    );
  } catch (err) {
    error(`Failed to get like details: ${err.message}`);
    throw new Error("Error retrieving like details.");
  }
};

// getLikesByPhoto returns the likes by photo
const getLikesByPhoto = async (photos) => {
  try {
    return Promise.all(
      photos.map(async (photo) => {
        return await retrieveLikesByPhoto(photo.id);
      })
    );
  } catch (err) {
    error(`Failed to get likes by photo: ${err.message}`);
    throw new Error("Error retrieving likes by photo.");
  }
};

// getLikesByPhotoUserDetails returns the details of
// the users who like the photos
const getLikesByPhotoUserDetails = async (photos) => {
  try {
    const likesByPhoto = await getLikesByPhoto(photos);
    let likesByPhotoUserDetails = [];
    for (let i = 0; i < likesByPhoto.length; i++) {
      likesByPhotoUserDetails[i] = await Promise.all(
        likesByPhoto[i].map(async (like) => {
          return await findUserById(like.userId);
        })
      );
    }
    return likesByPhotoUserDetails;
  } catch (err) {
    error(`Failed to get likes by photo user details: ${err.message}`);
    throw new Error("Error retrieving likes by photo user details.");
  }
};

// getCommentsByPhoto returns the comments by each photos
const getCommentsByPhoto = async (photos) => {
  try {
    return Promise.all(
      photos.map(async (photo) => {
        return await retrieveCommentsByPhoto(photo.id);
      })
    );
  } catch (err) {
    error(`Failed to get comments by photo: ${err.message}`);
    throw new Error("Error retrieving comments by photo.");
  }
};

// getCommentsByPhotoUserDetails returns the details of
// the users who comment the photos
const getCommentsByPhotoUserDetails = async (photos) => {
  try {
    const commentsByPhoto = await getCommentsByPhoto(photos);
    let commentsByPhotoUserDetails = [];
    for (let i = 0; i < commentsByPhoto.length; i++) {
      commentsByPhotoUserDetails[i] = await Promise.all(
        commentsByPhoto[i].map(async (comment) => {
          return await findUserById(comment.userId);
        })
      );
    }
    return commentsByPhotoUserDetails;
  } catch (err) {
    error(`Failed to get comments by photo user details: ${err.message}`);
    throw new Error("Error retrieving comments by photo user details.");
  }
};

const getProfilePicture = async (userId) => {
  try {
    // Retrieve the profile picture URL
    const profilePictureUrl = await retrieveProfilePicture(userId);
    // Return the downloaded profile picture
    return profilePictureUrl
      ? await downloadProfilePicture(profilePictureUrl)
      : null;
  } catch (err) {
    error(`Failed to get profile picture: ${err.message}`);
    throw new Error("Error retrieving profile picture.");
  }
};

// Helper function to gather profile data
const getProfileData = async (userId, localPhotos, photos, user) => {
  try {
    const profilePicture = await getProfilePicture(userId);
    const followings = await getFollowingsDetail(userId);
    const followers = await getFollowersDetail(userId);
    const likeDetails = await getLikeDetails(userId, photos);
    const likesByPhotoUserDetails = await getLikesByPhotoUserDetails(photos);
    const commentsByPhoto = await getCommentsByPhoto(photos);
    const commentsByPhotoUserDetails = await getCommentsByPhotoUserDetails(
      photos
    );

    return {
      photos: localPhotos,
      photos_info: photos,
      user,
      profilePicture,
      followings,
      followers,
      likeDetails,
      likesByPhotoUserDetails,
      commentsByPhoto,
      commentsByPhotoUserDetails,
    };
  } catch (err) {
    error(`Failed to gather profile data: ${err.message}`);
    throw new Error("Error gathering profile data.");
  }
};

export {
  getFollowersDetail,
  getFollowingsDetail,
  getLikeDetails,
  getLikesByPhotoUserDetails,
  getCommentsByPhoto,
  getCommentsByPhotoUserDetails,
  getProfilePicture,
  getProfileData,
};
