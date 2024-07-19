// src/presentation/routes/photoRoutes.js
import express from "express";
import { addPhoto } from "../controllers/photoController.js";
import multer from "multer";
import { validateAddPhoto } from "../../middleware/validationMiddleware.js";

const router = express.Router();

// Set up multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("photo"), validateAddPhoto, addPhoto);

export default router;
