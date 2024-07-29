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
import { isFollowing } from "../../business/services/followService.js";
import { log, error } from "../../utils/logger.js";

const router = express.Router();

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/home");
  } else {
    res.render("index.ejs");
  }
});

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.get("/register", (req, res) => {
  res.render("register.ejs");
});

router.get("/home", (req, res) => {
  if (req.isAuthenticated()) {
    const successMessage = req.query.success || "";
    const { username } = req.user;
    res.render("home.ejs", { username, successMessage });
  } else {
    res.redirect("/login");
  }
});

router.get("/addContent", (req, res) => {
  if (req.isAuthenticated()) {
    const errMsg = req.query.errmsg || "";
    const { id } = req.user;
    res.render("addContent.ejs", { userId: id, errMsg });
  } else {
    res.redirect("/login");
  }
});

router.get("/profile", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const user = req.user;
      const photos = await retrievePhotos(user.id);
      const localPhotos = await downloadPhotos(photos);
      const profilePictureUrl = await retrieveProfilePicture(user.id);
      const profilePictureLocalUrl = await downloadProfilePicture(
        profilePictureUrl
      );

      res.render("profile.ejs", {
        photos: localPhotos,
        profilePicture: profilePictureLocalUrl,
        user,
      });

      cleanUpLocalFiles();
    } catch (err) {
      error(`Failed to retrieve photos: ${err.message}`);
      res.status(500).json({ message: err.message });
    }
  } else {
    res.redirect("/login");
  }
});

router.get("/search", async (req, res) => {
  if (req.isAuthenticated()) {
    const errMsg = req.query.errmsg || "";
    res.render("search.ejs", { errMsg });
  } else {
    res.redirect("/login");
  }
});

router.get("/userProfile/:userId", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const userId = req.params.userId;
      const following = await isFollowing(req.user.id, userId);
      const user = await findUserById(userId);
      const photos = await retrievePhotos(userId);
      const localPhotos = await downloadPhotos(photos);
      const profilePictureUrl = await retrieveProfilePicture(userId);
      const profilePictureLocalUrl = await downloadProfilePicture(
        profilePictureUrl
      );
      res.render("userProfile.ejs", {
        photos: localPhotos,
        profilePicture: profilePictureLocalUrl,
        user,
        following,
      });

      cleanUpLocalFiles();
    } catch (err) {
      error(`Failed to retrieve photos: ${err.message}`);
      res.status(500).json({ message: err.message });
    }
  } else {
    res.redirect("/login");
  }
});

export default router;
