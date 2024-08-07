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

// getFollowersDetail returns the user details of followers
const getFollowersDetail = async (userId) => {
  const followers = await retrieveFollowers(userId);
  return Promise.all(
    followers.map(async (follow) => {
      return await findUserById(follow.followerId);
    })
  );
};

// getFollowingsDetail returns the user details of followings
const getFollowingsDetail = async (userId) => {
  const followings = await retrieveFollowings(userId);
  return Promise.all(
    followings.map(async (follow) => {
      return await findUserById(follow.followedId);
    })
  );
};

// getLikeDetails determines whether the photos are liked by the user or not
const getLikeDetails = async (userId, photos) => {
  return Promise.all(
    photos.map(async (photo) => {
      return await retrieveLikeInfo(userId, photo.id);
    })
  );
};

// getLikesByPhoto returns the likes by photo
const getLikesByPhoto = async (photos) => {
  return Promise.all(
    photos.map(async (photo) => {
      return await retrieveLikesByPhoto(photo.id);
    })
  );
};

// getLikesByPhotoUserDetails returns the details of
// the users who like the photos
const getLikesByPhotoUserDetails = async (photos) => {
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
};

// getCommentsByPhoto returns the comments by each photos
const getCommentsByPhoto = async (photos) => {
  return Promise.all(
    photos.map(async (photo) => {
      return await retrieveCommentsByPhoto(photo.id);
    })
  );
};

// getCommentsByPhotoUserDetails returns the details of
// the users who comment the photos
const getCommentsByPhotoUserDetails = async (photos) => {
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
};

const getProfilePicture = async (userId) => {
  // Retrieve the profile picture URL
  const profilePictureUrl = await retrieveProfilePicture(userId);
  // Return the downloaded profile picture
  return profilePictureUrl
    ? await downloadProfilePicture(profilePictureUrl)
    : null;
};

export {
  getFollowersDetail,
  getFollowingsDetail,
  getLikeDetails,
  getLikesByPhotoUserDetails,
  getCommentsByPhoto,
  getCommentsByPhotoUserDetails,
  getProfilePicture,
};
