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

// Get user by email
const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

// Get user by ID
const getUserById = async (id) => {
  return await User.findByPk(id);
};

// Update user's password
const updatePassword = async (userId, newPassword) => {
  return await User.update(
    { password: newPassword },
    { where: { id: userId } }
  );
};

// Edit profile picture
const editProfilePicture = async (userId, photoUrl) => {
  return await User.update(
    { profilePicture: photoUrl },
    { where: { id: userId } }
  );
};

const getProfilePicture = async (userId) => {
  return await User.findOne({ where: { id: userId } });
};

export {
  createUser,
  editBio,
  editUsername,
  editEmail,
  getUserByEmail,
  getUserById,
  updatePassword,
  editProfilePicture,
  getProfilePicture,
};
