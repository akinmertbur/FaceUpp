import express from "express";
import {
  retrievePhotos,
  downloadPhotos,
  downloadProfilePicture,
  cleanUpLocalFiles,
} from "../../business/services/photoService.js";
import { retrieveProfilePicture } from "../../business/services/userService.js";
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
      const profilePictureUrl = await retrieveProfilePicture(user.id);

      const localPhotos = await downloadPhotos(photos);
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

export default router;
