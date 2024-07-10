// src/business/services/photoService.js
import { addPhoto } from "../../data/repositories/photoRepository.js";
import dotenv from "dotenv";
import AWS from "aws-sdk";
import { log, error } from "../../utils/logger.js";

dotenv.config();

const insertPhoto = async (photoData) => {
  return await addPhoto(photoData);
};

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const uploadPhotoToS3 = async (file, userId, photoId) => {
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

export { insertPhoto, uploadPhotoToS3 };
