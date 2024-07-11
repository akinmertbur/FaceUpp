import { createUser, editBio } from "../../data/repositories/userRepository.js";

const addUser = async (userData) => {
  return await createUser(userData);
};

const changeBio = async (userId, bioText) => {
  return await editBio(userId, bioText);
};

export { addUser, changeBio };
