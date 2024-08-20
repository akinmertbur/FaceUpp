// src/data/repositories/photoRepository.js
import Photo from "../models/photoModel.js";

const addPhoto = async (photoData) => {
  return await Photo.create(photoData);
};

const getPhotos = async (userId, filter = {}) => {
  return await Photo.findAll({
    where: {
      userId,
      ...filter.where,
    },
    order: [["id", "ASC"]],
  });
};

const editCaption = async (photoId, newCaption) => {
  return await Photo.update(
    { caption: newCaption },
    { where: { id: photoId } }
  );
};

export { addPhoto, getPhotos, editCaption };
