import {
  follow,
  unfollow,
  getFollowingInfo,
  getFollowers,
  getFollowings,
} from "../../data/repositories/followRepository.js";

const followUser = async (followerId, followedId) => {
  try {
    if (!followedId || !followerId) {
      throw new Error("IDs required for follower and followed users!");
    }

    return await follow(followerId, followedId);
  } catch (err) {
    throw new Error(`Failed to follow user: ${err.message}`);
  }
};

const unfollowUser = async (followerId, followedId) => {
  try {
    if (!followedId || !followerId) {
      throw new Error("IDs required for follower and followed users!");
    }

    return await unfollow(followerId, followedId);
  } catch (err) {
    throw new Error(`Failed to unfollow user: ${err.message}`);
  }
};

const isFollowing = async (followerId, followedId) => {
  try {
    if (!followedId || !followerId) {
      throw new Error("IDs required for follower and followed users!");
    }

    return await getFollowingInfo(followerId, followedId);
  } catch (err) {
    throw new Error(`Failed to check following status: ${err.message}`);
  }
};

const retrieveFollowers = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required!");
    }

    return await getFollowers(userId);
  } catch (err) {
    throw new Error(`Failed to retrieve followers: ${err.message}`);
  }
};

const retrieveFollowings = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required!");
    }

    return await getFollowings(userId);
  } catch (err) {
    throw new Error(`Failed to retrieve followings: ${err.message}`);
  }
};

export {
  followUser,
  unfollowUser,
  isFollowing,
  retrieveFollowers,
  retrieveFollowings,
};
