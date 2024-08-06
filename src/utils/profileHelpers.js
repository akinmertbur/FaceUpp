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

// getLikesByPhotoUsername returns the username of
// the users who like the photos
const getLikesByPhotoUsername = async (photos) => {
  const likesByPhoto = await getLikesByPhoto(photos);
  let likesByPhotoUsername = [];
  for (let i = 0; i < likesByPhoto.length; i++) {
    likesByPhotoUsername[i] = await Promise.all(
      likesByPhoto[i].map(async (like) => {
        let user = await findUserById(like.userId);
        return user.username;
      })
    );
  }
  return likesByPhotoUsername;
};

// getCommentsByPhoto returns the comments by photo
const getCommentsByPhoto = async (photos) => {
  return Promise.all(
    photos.map(async (photo) => {
      return await retrieveCommentsByPhoto(photo.id);
    })
  );
};

// commentsByPhotoUsername contains the username of
// the users who comment the photos
const getCommentsByPhotoUsername = async (photos) => {
  const commentsByPhoto = await getCommentsByPhoto(photos);
  let commentsByPhotoUsername = [];
  for (let i = 0; i < commentsByPhoto.length; i++) {
    commentsByPhotoUsername[i] = await Promise.all(
      commentsByPhoto[i].map(async (comment) => {
        let user = await findUserById(comment.userId);
        return user.username;
      })
    );
  }
  return commentsByPhotoUsername;
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
  getLikesByPhotoUsername,
  getCommentsByPhoto,
  getCommentsByPhotoUsername,
  getProfilePicture,
};
