import Follow from "../models/followModel.js";

const follow = async (followerId, followedId) => {
  const followObj = {
    followerId: followerId,
    followedId: followedId,
  };
  return await Follow.create(followObj);
};

const unfollow = async (followerId, followedId) => {
  const row = await Follow.findOne({
    where: { followerId: followerId, followedId: followedId },
  });
  if (row) {
    await row.destroy(); // deletes the row
  }
};

const getFollowingInfo = async (followerId, followedId) => {
  return await Follow.findOne({
    where: { followerId: followerId, followedId: followedId },
  });
};

export { follow, unfollow, getFollowingInfo };
