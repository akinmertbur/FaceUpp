import User from "../models/userModel.js";

const createUser = async (userData) => {
  return await User.create(userData);
};

const editBio = async (userId, bioText) => {
  return await User.update({ bio: bioText }, { where: { id: userId } });
};

export { createUser, editBio };
