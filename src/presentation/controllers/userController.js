import {
  addUser,
  changeBio,
  changeUsername,
  changeEmail,
} from "../../business/services/userService.js";
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

const editBio = async (req, res) => {
  try {
    const { userId, bioText } = req.body;
    const user = await changeBio(userId, bioText);
    log(`Bio edited for the user ID: ${userId}`);
    res.status(201).redirect("/api/photos/getPhotos");
  } catch (err) {
    error(`Failed to edit bio: ${err.message}`); // Log an error message if there's an exception
    res.status(500).json({ message: err.message });
  }
};

const editUsername = async (req, res) => {
  try {
    const { userId, username } = req.body;
    const user = await changeUsername(userId, username);
    log(`Username edited for the user ID: ${userId}`);
    res.status(201).redirect("/api/photos/getPhotos");
  } catch (err) {
    error(`Failed to edit username: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const editEmail = async (req, res) => {
  try {
    const { userId, email } = req.body;
    const user = await changeEmail(userId, email);
    log(`Email edited for the user ID: ${userId}`);
    res.status(201).redirect("/api/photos/getphotos");
  } catch (err) {
    error(`Failed to edit email: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

export { createUser, editBio, editUsername, editEmail };
