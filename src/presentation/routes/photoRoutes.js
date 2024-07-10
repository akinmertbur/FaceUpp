// src/presentation/routes/photoRoutes.js
import express from "express";
import { addPhoto, getPhotos } from "../controllers/photoController.js";
import multer from "multer";

const router = express.Router();

// Set up multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("photo"), addPhoto);
router.get("/getPhotos", getPhotos);

export default router;
