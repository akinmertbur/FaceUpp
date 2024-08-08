// src/controllers/viewController.js
import {
  retrievePhotos,
  downloadPhotos,
  cleanUpLocalFiles,
} from "../../business/services/photoService.js";
import { findUserById } from "../../business/services/authService.js";
import { isFollowing } from "../../business/services/followService.js";
import { getProfileData } from "../../utils/profileHelpers.js";
import { error } from "../../utils/logger.js";

const renderProfile = async (req, res) => {
  try {
    const user = req.user;
    const photos = await retrievePhotos(user.id);
    const localPhotos = await downloadPhotos(photos);
    const profileData = await getProfileData(
      user.id,
      localPhotos,
      photos,
      user
    );

    res.render("profile.ejs", profileData);

    cleanUpLocalFiles();
  } catch (err) {
    error(`Failed to retrieve profile data: ${err.message}`);
    res.status(500).json({ message: "Error retrieving profile data." });
  }
};

const renderUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const reqUserId = req.user.id;

    if (reqUserId == userId) {
      res.redirect("/profile");
    }

    const following = await isFollowing(reqUserId, userId);
    const user = await findUserById(userId);
    const photos = await retrievePhotos(userId);
    const localPhotos = await downloadPhotos(photos);
    const profileData = await getProfileData(userId, localPhotos, photos, user);

    res.render("userProfile.ejs", {
      ...profileData,
      following,
      reqUserId,
    });

    cleanUpLocalFiles();
  } catch (err) {
    error(`Failed to render user profile: ${err.message}`);
    res.status(500).json({ message: "Error rendering user profile." });
  }
};

const renderHome = (req, res) => {
  const successMessage = req.query.success || "";
  const { username } = req.user;
  res.render("home.ejs", { username, successMessage });
};

const renderAddContent = (req, res) => {
  const errMsg = req.query.errmsg || "";
  const { id } = req.user;
  res.render("addContent.ejs", { userId: id, errMsg });
};

const renderSearch = (req, res) => {
  const errMsg = req.query.errmsg || "";
  res.render("search.ejs", { errMsg });
};

export {
  renderProfile,
  renderUserProfile,
  renderHome,
  renderAddContent,
  renderSearch,
};
