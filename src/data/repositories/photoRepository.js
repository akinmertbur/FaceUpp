// src/data/repositories/photoRepository.js
import Photo from "../models/photoModel.js";

const addPhoto = async (photoData) => {
  return await Photo.create(photoData);
};

export { addPhoto };
