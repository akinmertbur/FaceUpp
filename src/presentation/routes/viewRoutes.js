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
import {
  retrieveLikeInfo,
  retrieveLikesByPhoto,
} from "../../business/services/likeService.js";
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
    const profilePictureLocalUrl = profilePictureUrl
      ? await downloadProfilePicture(profilePictureUrl)
      : null;

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

    const likeDetails = await Promise.all(
      photos.map(async (photo) => {
        return await retrieveLikeInfo(req.user.id, photo.id);
      })
    );

    const _likesByPhoto = await Promise.all(
      photos.map(async (photo) => {
        return await retrieveLikesByPhoto(photo.id);
      })
    );

    let likesByPhoto = [];
    for (let i = 0; i < _likesByPhoto.length; i++) {
      likesByPhoto[i] = []; // Initialize the sub-array
      let promises = _likesByPhoto[i].map(async (like) => {
        let user = await findUserById(like.userId);
        return user.username;
      });
      likesByPhoto[i] = await Promise.all(promises);
    }

    res.render("profile.ejs", {
      photos: localPhotos,
      photos_info: photos,
      profilePicture: profilePictureLocalUrl,
      user,
      followings: followingsDetail,
      followers: followersDetail,
      likeDetails,
      likesByPhoto,
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

      const likeDetails = await Promise.all(
        photos.map(async (photo) => {
          return await retrieveLikeInfo(req.user.id, photo.id);
        })
      );

      res.render("userProfile.ejs", {
        photos: localPhotos,
        photos_info: photos,
        profilePicture: profilePictureLocalUrl,
        user,
        following,
        likeDetails,
      });

      cleanUpLocalFiles();
    }
  } catch (err) {
    error(`Failed to render user profile: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});

export default router;
