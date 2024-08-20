// src/services/viewService.js
import { retrievePhotos, downloadPhotos } from "./photoService.js";
import { getProfileData } from "../../utils/profileHelpers.js";
import { getHomeData } from "../../utils/homeHelpers.js";
import { findUserById } from "./authService.js";

export const prepareProfileData = async (userId, reqUserId = null) => {
  const photos = await retrievePhotos(userId);
  const localPhotos = await downloadPhotos(photos);
  const user = await findUserById(userId);
  return await getProfileData(userId, localPhotos, photos, user, reqUserId);
};

export const prepareHomeData = async (user) => {
  return await getHomeData(user);
};
