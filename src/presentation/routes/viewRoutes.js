// src/presentation/routes/viewRoutes.js
import express from "express";
import {
  retrievePhotos,
  downloadPhotos,
  downloadProfilePicture,
  cleanUpLocalFiles,
} from "../../business/services/photoService.js";
import { retrieveProfilePicture } from "../../business/services/userService.js";
import { findUserById } from "../../business/services/authService.js";
import {
  isFollowing,
  retrieveFollowers,
  retrieveFollowings,
} from "../../business/services/followService.js";
import { log, error } from "../../utils/logger.js";
import { ensureAuthenticated } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
  res.redirect("/home");
});

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.get("/register", (req, res) => {
  res.render("register.ejs");
});

router.get("/home", ensureAuthenticated, (req, res) => {
  const successMessage = req.query.success || "";
  const { username } = req.user;
  res.render("home.ejs", { username, successMessage });
});

router.get("/addContent", ensureAuthenticated, (req, res) => {
  const errMsg = req.query.errmsg || "";
  const { id } = req.user;
  res.render("addContent.ejs", { userId: id, errMsg });
});

router.get("/profile", ensureAuthenticated, async (req, res) => {
  try {
    const user = req.user;
    const photos = await retrievePhotos(user.id);
    const localPhotos = await downloadPhotos(photos);
    const profilePictureUrl = await retrieveProfilePicture(user.id);
    const profilePictureLocalUrl = await downloadProfilePicture(
      profilePictureUrl
    );
    const followers = await retrieveFollowers(user.id);
    const followings = await retrieveFollowings(user.id);

    // followings_username contains details of the followings.
    const followingsDetail = await Promise.all(
      followings.map(async (follow) => {
        return await findUserById(follow.followedId);
      })
    );

    // followers_username contains details of the followers.
    const followersDetail = await Promise.all(
      followers.map(async (follow) => {
        return await findUserById(follow.followerId);
      })
    );

    res.render("profile.ejs", {
      photos: localPhotos,
      profilePicture: profilePictureLocalUrl,
      user,
      followings: followingsDetail,
      followers: followersDetail,
    });

    cleanUpLocalFiles();
  } catch (err) {
    error(`Failed to retrieve photos: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});

router.get("/search", ensureAuthenticated, async (req, res) => {
  const errMsg = req.query.errmsg || "";
  res.render("search.ejs", { errMsg });
});

router.get("/userProfile/:userId", ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.params.userId;
    if (req.user.id == userId) {
      res.redirect("/profile");
    } else {
      const following = await isFollowing(req.user.id, userId);
      const user = await findUserById(userId);
      const photos = await retrievePhotos(userId);
      const localPhotos = await downloadPhotos(photos);
      const profilePictureUrl = await retrieveProfilePicture(userId);
      const profilePictureLocalUrl = profilePictureUrl
        ? await downloadProfilePicture(profilePictureUrl)
        : null;

      res.render("userProfile.ejs", {
        photos: localPhotos,
        profilePicture: profilePictureLocalUrl,
        user,
        following,
      });

      cleanUpLocalFiles();
    }
  } catch (err) {
    error(`Failed to render user profile: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});

export default router;
