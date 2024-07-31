import Follow from "../models/followModel.js";

const follow = async (followerId, followedId) => {
  return await Follow.create({ followerId, followedId });
};

const unfollow = async (followerId, followedId) => {
  const row = await Follow.findOne({
    where: { followerId, followedId },
  });
  if (row) {
    await row.destroy(); // deletes the row
  }
};

const getFollowingInfo = async (followerId, followedId) => {
  return await Follow.findOne({
    where: { followerId, followedId },
  });
};

const getFollowers = async (userId) => {
  return await Follow.findAll({
    where: { followedId: userId },
  });
};

const getFollowings = async (userId) => {
  return await Follow.findAll({
    where: { followerId: userId },
  });
};

export { follow, unfollow, getFollowingInfo, getFollowers, getFollowings };
