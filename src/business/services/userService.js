import {
  createUser,
  editBio,
  editUsername,
  editEmail,
} from "../../data/repositories/userRepository.js";

const addUser = async (userData) => {
  return await createUser(userData);
};

const changeBio = async (userId, bioText) => {
  return await editBio(userId, bioText);
};

const changeUsername = async (userId, username) => {
  return await editUsername(userId, username);
};

const changeEmail = async (userId, email) => {
  return await editEmail(userId, email);
};

export { addUser, changeBio, changeUsername, changeEmail };
