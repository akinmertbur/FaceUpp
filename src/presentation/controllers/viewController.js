// src/controllers/viewController.js
import {
  retrievePhotos,
  downloadPhotos,
  cleanUpLocalFiles,
} from "../../business/services/photoService.js";
import { findUserById } from "../../business/services/authService.js";
import { isFollowing } from "../../business/services/followService.js";
import { getProfileData } from "../../utils/profileHelpers.js";
import { getHomeData } from "../../utils/homeHelpers.js";
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
      user,
      null
    );
    const errMsg = req.query.errmsg || "";

    res.render("profile.ejs", { ...profileData, errMsg });

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
    const profileData = await getProfileData(
      userId,
      localPhotos,
      photos,
      user,
      reqUserId
    );

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

const renderHome = async (req, res) => {
  try {
    const successMessage = req.query.success || "";
    const user = req.user;
    const homeData = await getHomeData(user);

    res.render("home.ejs", {
      ...homeData,
      successMessage,
    });

    cleanUpLocalFiles();
  } catch (err) {
    error(`Failed to render home page: ${err.message}`);
    res.status(500).json({ message: "Error rendering home page." });
  }
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

const renderRegister = (req, res) => {
  const errMsg = req.query.errmsg || "";
  res.render("register.ejs", { errMsg });
};

const renderLogin = (req, res) => {
  const successMsg = req.query.success || "";
  const errorMsg = req.query.errmsg || "";
  res.render("login.ejs", { successMsg, errorMsg });
};

export {
  renderProfile,
  renderUserProfile,
  renderHome,
  renderAddContent,
  renderSearch,
  renderRegister,
  renderLogin,
};
