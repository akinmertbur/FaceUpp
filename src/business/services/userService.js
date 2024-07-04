// src/business/services/userService.js
import { createUser } from "../../data/repositories/userRepository.js";

const addUser = async (userData) => {
  return await createUser(userData);
};

export { addUser };
