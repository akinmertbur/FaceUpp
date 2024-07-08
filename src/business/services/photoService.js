// src/business/services/photoService.js
import { addPhoto } from "../../data/repositories/photoRepository.js";

const insertPhoto = async (photoData) => {
  return await addPhoto(photoData);
};

export { insertPhoto };
