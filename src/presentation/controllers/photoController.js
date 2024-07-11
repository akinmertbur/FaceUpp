import { v4 as uuidv4 } from "uuid";
import {
  insertPhoto,
  uploadPhotoToS3,
  retrievePhotos,
  downloadPhoto,
} from "../../business/services/photoService.js";
import { log, error } from "../../utils/logger.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const addPhoto = async (req, res) => {
  try {
    const img = req.file;
    const userId = req.body.userId;
    const photoId = uuidv4(); // Generate a unique photoId

    if (!img) {
      throw new Error("No file uploaded");
    }

    if (!userId) {
      throw new Error("User ID is required");
    }

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

const getPhotos = async (req, res) => {
  try {
    const user = req.user;
    const photos = await retrievePhotos(user.id);

    const downloadPromises = photos.map((photo) => {
      const localPath = path.join(__dirname, "../../../src/public/images");
      return downloadPhoto(photo.photoUrl, localPath).then((localFilePath) => {
        return {
          ...photo,
          localUrl: `/images/${path.basename(localFilePath)}`,
        };
      });
    });

    const localPhotos = await Promise.all(downloadPromises);

    res.render("profile.ejs", { photos: localPhotos, user });

    // Schedule deletion of the images directory after rendering
    setTimeout(() => {
      const localPath = path.join(__dirname, "../../../src/public/images");
      fs.rmdir(localPath, { recursive: true }, (err) => {
        if (err) {
          error(`Failed to delete images directory: ${err.message}`);
        } else {
          log("Images directory deleted successfully");
        }
      });
    }, 5000); // Adjust the delay as needed
  } catch (err) {
    error(`Failed to retrieve photos: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

export { addPhoto, getPhotos };
