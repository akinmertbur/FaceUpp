// src/presentation/controllers/photoController.js
import { v4 as uuidv4 } from "uuid";
import {
  insertPhoto,
  uploadPhotoToS3,
  updateCaption,
} from "../../business/services/photoService.js";
import { log, error } from "../../utils/logger.js";

const addPhoto = async (req, res) => {
  try {
    const img = req.file;
    const userId = req.body.userId;
    const photoId = uuidv4(); // Generate a unique photoId

    const key = await uploadPhotoToS3(img, userId, photoId); // Upload photo to S3

    const photoData = {
      ...req.body,
      photoUrl: key, // Save the key
    };

    const photo = await insertPhoto(photoData); // Insert photo data into the database
    log(`Photo created with ID: ${photo.id}`); // Log a message when photo is created
    res.status(201).redirect("/home?success=Photo uploaded successfully"); // Redirect to /addContent with a success message
  } catch (err) {
    error(`Failed to create photo: ${err.message}`); // Log an error message if there's an exception
    res.status(500).redirect(`/addContent?errmsg=${err.message}`);
  }
};

const editCaption = async (req, res) => {
  try {
    const { photoId, newCaption } = req.body;
    const result = await updateCaption(photoId, newCaption);

    if (result[0] === 0) {
      return res.status(404).json({ message: "Photo not found" });
    }
    log(`Caption of the photo ID ${photoId} is updated`);
    res.status(200).json({ caption: newCaption });
  } catch (err) {
    error(`Failed to update: ${err.message}`);
    res.status(500).json({ message: "Error updating caption", err });
  }
};

export { addPhoto, editCaption };
