import { v4 as uuidv4 } from "uuid";
import {
  addUser,
  changeBio,
  changeUsername,
  changeEmail,
  changeProfilePicture,
  retrieveUsersByUsername,
} from "../../business/services/userService.js";
import { uploadPhotoToS3 } from "../../business/services/photoService.js";
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
  const { userId, bioText } = req.body;
  try {
    const result = await changeBio(userId, bioText);

    if (result[0] === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    log(`Bio edited for the user ID: ${userId}`);
    res.status(200).json({ bio: bioText });
  } catch (err) {
    error(`Failed to edit bio: ${err.message}`); // Log an error message if there's an exception
    res.status(500).json({ message: err.message });
  }
};

const editUsername = async (req, res) => {
  const { userId, username } = req.body;
  try {
    const result = await changeUsername(userId, username);

    if (result[0] === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    log(`Username edited for the user ID: ${userId}`);
    res.status(200).json({ username });
  } catch (err) {
    error(`Failed to edit username: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const editEmail = async (req, res) => {
  const { userId, email } = req.body;
  try {
    const result = await changeEmail(userId, email);

    if (result[0] === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    log(`Email edited for the user ID: ${userId}`);
    res.status(200).json({ message: "Email edited successfully" });
  } catch (err) {
    error(`Failed to edit email: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const editProfilePicture = async (req, res) => {
  try {
    const img = req.file;
    const userId = req.body.userId;
    const photoId = uuidv4(); // Generate a unique photoId

    if (!img) {
      throw new Error("No file uploaded");
    }

    if (!userId) {
      throw new Error("User ID is required");
    }

    const key = await uploadPhotoToS3(img, userId, photoId); // Upload photo to S3

    const result = await changeProfilePicture(userId, key);

    if (result[0] === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    log(`Profile picture added with ID: ${photoId}`); // Log a message when photo is created
    res.status(200).json({ message: "Profile picture added successfully" });
  } catch (err) {
    error(`Failed to add profile picture: ${err.message}`); // Log an error message if there's an exception
    res.status(500).json({ message: err.message });
  }
};

const getUsersByUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const users = await retrieveUsersByUsername(username);
    if (users.length == 0) {
      return res.status(404).render("search.ejs", {
        users: [],
        errMsg: "User not found!",
      });
    }
    res.status(200).render("search.ejs", {
      users,
      success: `${users.length} user(s) are found!`,
    });
  } catch (err) {
    error(`Failed to retrieve users`);
    res.status(500).redirect(`/search?errmsg=${err.message}`);
  }
};

export {
  createUser,
  editBio,
  editUsername,
  editEmail,
  editProfilePicture,
  getUsersByUsername,
};
