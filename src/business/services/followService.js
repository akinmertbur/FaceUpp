import {
  follow,
  unfollow,
  getFollowingInfo,
  getFollowers,
  getFollowings,
} from "../../data/repositories/followRepository.js";

const followUser = async (followerId, followedId) => {
  if (!followedId || !followerId) {
    throw new Error("IDs required for follower and followed users!");
  }

  return await follow(followerId, followedId);
};

const unfollowUser = async (followerId, followedId) => {
  if (!followedId || !followerId) {
    throw new Error("IDs required for follower and followed users!");
  }

  return await unfollow(followerId, followedId);
};

const isFollowing = async (followerId, followedId) => {
  if (!followedId || !followerId) {
    throw new Error("IDs required for follower and followed users!");
  }

  return await getFollowingInfo(followerId, followedId);
};

const retrieveFollowers = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required!");
  }

  return await getFollowers(userId);
};

const retrieveFollowings = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required!");
  }

  return await getFollowings(userId);
};

export {
  followUser,
  unfollowUser,
  isFollowing,
  retrieveFollowers,
  retrieveFollowings,
};
