import {
  followUser,
  unfollowUser,
  isFollowing,
} from "../../business/services/followService.js";
import { log, error } from "../../utils/logger.js";

const follow = async (req, res) => {
  try {
    const { userId } = req.body;
    const fallowerId = req.user.id;
    const following = await followUser(fallowerId, userId);
    log(`${fallowerId} is following ${userId}`);
    res.status(200).redirect(`/userProfile/${userId}`);
  } catch (err) {
    error(`Failed to follow: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const unfollow = async (req, res) => {
  try {
    const { userId } = req.body;
    const fallowerId = req.user.id;
    const unfollowing = unfollowUser(fallowerId, userId);
    log(`${fallowerId} is unfollowing ${userId}`);
    res.status(200).redirect(`/userProfile/${userId}`);
  } catch (err) {
    error(`Failed to unfollow: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

export { follow, unfollow };
