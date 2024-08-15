import express from "express";
import { like, unlike } from "../controllers/likeController.js";
import { valdiateLikeUnlike } from "../../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/like", valdiateLikeUnlike, like);
router.delete("/unlike", valdiateLikeUnlike, unlike);

export default router;
