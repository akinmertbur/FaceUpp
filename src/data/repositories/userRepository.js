import User from "../models/userModel.js";

const createUser = async (userData) => {
  return await User.create(userData);
};

const editBio = async (userId, bioText) => {
  return await User.update({ bio: bioText }, { where: { id: userId } });
};

const editUsername = async (userId, username) => {
  return await User.update({ username: username }, { where: { id: userId } });
};

const editEmail = async (userId, email) => {
  return await User.update({ email: email }, { where: { id: userId } });
};

export { createUser, editBio, editUsername, editEmail };
