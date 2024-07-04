// src/data/repositories/userRepository.js
import User from "../models/userModel.js";

const createUser = async (userData) => {
  return await User.create(userData);
};

export { createUser };
