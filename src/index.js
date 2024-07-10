// src/index.js
import express from "express";
import { connectDB } from "./data/database/dbConfig.js";
import { configureMiddleware } from "./middleware.js";
import { configureRoutes } from "./routes.js";
import dotenv from "dotenv";
import { log } from "./utils/logger.js";
import AWS from "aws-sdk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
const ss3 = new AWS.S3();

// Helper to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadFile = async (filePath, bucketName, key) => {
  const fs = await import("fs").then((module) => module.promises);
  const fileContent = await fs.readFile(filePath);

  const params = {
    Bucket: bucketName,
    Key: key,
    Body: fileContent,
    ContentType: "image/jpeg", // Adjust content type based on the file type
  };

  try {
    const data = await s3.upload(params).promise();
    console.log(`File uploaded successfully. ${data.Location}`);
  } catch (err) {
    console.error("Error", err);
  }
};

const downloadFile = async (bucketName, key, downloadPath) => {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    const data = await ss3.getObject(params).promise();
    fs.writeFileSync(downloadPath, data.Body);
    console.log(`File downloaded successfully to ${downloadPath}`);
  } catch (err) {
    console.error("Error", err);
  }
};

// Example usage
const filePath = "x.jpg";
const bucketName = "faceuppbucket";
const key = "photos/photo.jpg"; // The path in the S3 bucket

const downloadPath = path.join(__dirname, "photo.jpg"); // Local path to save the file

//uploadFile(filePath, bucketName, key);
//downloadFile(bucketName, key, downloadPath);

// Configure middleware
configureMiddleware(app);

// Configure routes
configureRoutes(app);

// Database connection
connectDB();

// Start server
app.listen(port, () => log(`Server running on port ${port}`));
