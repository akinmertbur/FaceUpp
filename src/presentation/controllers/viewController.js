// src/controllers/viewController.js

import { isFollowing } from "../../business/services/followService.js";
import { error } from "../../utils/logger.js";
import { renderPageWithCleanup } from "../../utils/viewHelpers.js";
import {
  prepareProfileData,
  prepareHomeData,
} from "../../business/services/viewService.js";

const renderProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const errMsg = req.query.errmsg || "";
    const profileData = await prepareProfileData(userId);

    await renderPageWithCleanup(res, "profile.ejs", { ...profileData, errMsg });
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
    const profileData = await prepareProfileData(userId, reqUserId);

    await renderPageWithCleanup(res, "userProfile.ejs", {
      ...profileData,
      following,
      reqUserId,
    });
  } catch (err) {
    error(`Failed to render user profile: ${err.message}`);
    res.status(500).json({ message: "Error rendering user profile." });
  }
};

const renderHome = async (req, res) => {
  try {
    const successMessage = req.query.success || "";
    const homeData = await prepareHomeData(req.user);

    await renderPageWithCleanup(res, "home.ejs", {
      ...homeData,
      successMessage,
    });
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
