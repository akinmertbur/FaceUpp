// src/data/repositories/photoRepository.js
import Photo from "../models/photoModel.js";

const addPhoto = async (photoData) => {
  return await Photo.create(photoData);
};

const getPhotos = async (userId) => {
  return await Photo.findAll({ where: { userId: userId } });
};
export { addPhoto, getPhotos };
