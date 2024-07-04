import { addUser } from "../../business/services/userService.js";
import { log, error } from "../../utils/logger.js"; // Import the logger functions

const createUser = async (req, res) => {
  try {
    const user = await addUser(req.body);
    log(`User created with ID: ${user.id}`); // Log a message when user is created
    res.status(201).redirect("/");
  } catch (err) {
    error(`Failed to create user: ${err.message}`); // Log an error message if there's an exception
    res.status(500).json({ message: err.message });
  }
};

export { createUser };
