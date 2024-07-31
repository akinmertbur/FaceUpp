import fs from "fs";
import path from "path";
import AWS from "aws-sdk";
import {
  addPhoto,
  getPhotos,
} from "../../data/repositories/photoRepository.js";
import dotenv from "dotenv";
import { log, error } from "../../utils/logger.js";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const insertPhoto = async (photoData) => {
  if (!photoData.userId) {
    throw new Error("User ID is required");
  }

  if (!photoData.photoUrl) {
    throw new Error("Photo URL is required");
  }

  return await addPhoto(photoData);
};

const uploadPhotoToS3 = async (file, userId, photoId) => {
  if (!file) {
    throw new Error("No file uploaded");
  }

  if (!userId) {
    throw new Error("User ID is required");
  }

  const key = `photos/${userId}-${photoId}-${file.originalname}`;
  const uploadParams = {
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const data = await s3.upload(uploadParams).promise();
    log(`File uploaded successfully. ${data.Location}`);
    return key; // Return the key of the uploaded file
  } catch (err) {
    error("Error uploading file:", err);
    throw new Error("Error uploading file.");
  }
};

const ensureDirectoryExistence = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const downloadPhoto = async (key, localPath) => {
  if (!key) {
    throw new Error("Photo key is required");
  }

  if (!localPath) {
    throw new Error("Local path is required");
  }

  ensureDirectoryExistence(localPath); // Ensure the directory exists

  const params = { Bucket: process.env.S3_BUCKET, Key: key };
  const filePath = path.resolve(localPath, key.split("/").pop());

  const file = fs.createWriteStream(filePath);

  return new Promise((resolve, reject) => {
    s3.getObject(params)
      .createReadStream()
      .pipe(file)
      .on("finish", () => {
        log(`File downloaded successfully to ${filePath}`);
        resolve(filePath);
      })
      .on("error", (err) => {
        error("Error downloading file:", err);
        reject(err);
      });
  });
};

const retrievePhotos = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  return await getPhotos(userId);
};

const downloadPhotos = async (photos) => {
  if (!photos || !Array.isArray(photos)) {
    throw new Error("Photos must be a valid array");
  }

  const downloadPromises = photos.map((photo) => {
    const localPath = path.join(__dirname, "../../../src/public/images");
    return downloadPhoto(photo.photoUrl, localPath).then((localFilePath) => {
      return {
        ...photo,
        localUrl: `/images/${path.basename(localFilePath)}`,
      };
    });
  });
  return await Promise.all(downloadPromises);
};

const downloadProfilePicture = async (profilePictureUrl) => {
  if (!profilePictureUrl) {
    throw new Error("Profile picture URL is required");
  }

  let profilePictureLocalUrl = null;
  const profilePictureLocalPath = path.join(
    __dirname,
    "../../../src/public/profilePictures"
  );
  const profilePictureLocalFilePath = await downloadPhoto(
    profilePictureUrl,
    profilePictureLocalPath
  );
  profilePictureLocalUrl = `/profilePictures/${path.basename(
    profilePictureLocalFilePath
  )}`;
  return profilePictureLocalUrl;
};

const cleanUpLocalFiles = () => {
  setTimeout(() => {
    const localPath = path.join(__dirname, "../../../src/public/images");
    if (fs.existsSync(localPath)) {
      fs.rmdir(localPath, { recursive: true }, (err) => {
        if (err) {
          error(`Failed to delete images directory: ${err.message}`);
        } else {
          log("Images directory deleted successfully");
        }
      });
    } else {
      log("Images directory does not exist");
    }
    const profilePicturePath = path.join(
      __dirname,
      "../../../src/public/profilePictures"
    );
    if (fs.existsSync(profilePicturePath)) {
      fs.rmdir(profilePicturePath, { recursive: true }, (err) => {
        if (err) {
          error(`Failed to delete profilePictures directory: ${err.message}`);
        } else {
          log("ProfilePictures directory deleted successfully");
        }
      });
    } else {
      log("ProfilePictures directory does not exist");
    }
  }, 5000); // Adjust the delay as needed
};

export {
  insertPhoto,
  uploadPhotoToS3,
  retrievePhotos,
  downloadPhoto,
  downloadPhotos,
  downloadProfilePicture,
  cleanUpLocalFiles,
};
