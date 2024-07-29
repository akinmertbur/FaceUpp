import {
  follow,
  unfollow,
  getFollowingInfo,
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

export { followUser, unfollowUser, isFollowing };
