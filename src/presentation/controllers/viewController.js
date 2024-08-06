// src/controllers/viewController.js
import {
  retrievePhotos,
  downloadPhotos,
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
import { retrieveCommentsByPhoto } from "../../business/services/commentService.js";
import {
  getProfilePicture,
  getFollowersDetail,
  getFollowingsDetail,
  getLikeDetails,
  getLikesByPhotoUsername,
  getCommentsByPhoto,
  getCommentsByPhotoUsername,
} from "../../utils/profileHelpers.js";
import { error } from "../../utils/logger.js";

const renderProfile = async (req, res) => {
  try {
    const user = req.user;
    const photos = await retrievePhotos(user.id);
    const localPhotos = await downloadPhotos(photos);
    const profilePicture = await getProfilePicture(user.id);
    const followings = await getFollowingsDetail(user.id);
    const followers = await getFollowersDetail(user.id);
    const likeDetails = await getLikeDetails(user.id, photos);
    const likesByPhotoUsername = await getLikesByPhotoUsername(photos);
    const commentsByPhoto = await getCommentsByPhoto(photos);
    const commentsByPhotoUsername = await getCommentsByPhotoUsername(photos);

    res.render("profile.ejs", {
      photos: localPhotos,
      photos_info: photos,
      user,
      profilePicture,
      followings,
      followers,
      likeDetails,
      likesByPhotoUsername,
      commentsByPhoto,
      commentsByPhotoUsername,
    });

    cleanUpLocalFiles();
  } catch (err) {
    error(`Failed to retrieve profile data: ${err.message}`);
    res.status(500).json({ message: "Error retrieving profile data." });
  }
};

const renderUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (req.user.id == userId) {
      res.redirect("/profile");
    } else {
      const following = await isFollowing(req.user.id, userId);
      const user = await findUserById(userId);
      const photos = await retrievePhotos(userId);
      const localPhotos = await downloadPhotos(photos);
      const profilePicture = await getProfilePicture(userId);
      const likeDetails = await getLikeDetails(req.user.id, photos);

      res.render("userProfile.ejs", {
        photos: localPhotos,
        photos_info: photos,
        profilePicture,
        user,
        following,
        likeDetails,
      });

      cleanUpLocalFiles();
    }
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
