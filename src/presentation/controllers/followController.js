import {
  followUser,
  unfollowUser,
  isFollowing,
} from "../../business/services/followService.js";
import { findUserById } from "../../business/services/authService.js";
import { log, error } from "../../utils/logger.js";

const follow = async (req, res) => {
  try {
    const { userId } = req.body;
    const followerId = req.user.id;
    const result = await followUser(followerId, userId);
    log(`${followerId} is following ${userId}`);
    const user = await findUserById(followerId);
    res.status(200).json({ user });
  } catch (err) {
    error(`Failed to follow: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const unfollow = async (req, res) => {
  try {
    const { userId } = req.body;
    const followerId = req.user.id;
    const result = await unfollowUser(followerId, userId);
    log(`${followerId} is unfollowing ${userId}`);
    const user = await findUserById(followerId);
    res.status(200).json({ user });
  } catch (err) {
    error(`Failed to unfollow: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

export { follow, unfollow };
