// src/presentation/routes/photoRoutes.js
import express from "express";
import { addPhoto } from "../controllers/photoController.js";
import multer from "multer";

const router = express.Router();

// Set up multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("photo"), addPhoto);

export default router;
