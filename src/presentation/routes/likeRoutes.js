import express from "express";
import { like, unlike } from "../controllers/likeController.js";

const router = express.Router();

router.post("/like", like);
router.post("/unlike", unlike);

export default router;
