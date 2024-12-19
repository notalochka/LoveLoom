import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { updateProfile, blockUser } from "../controllers/userController.js";

const router = express.Router();

router.put("/update", protectRoute, updateProfile);
router.post("/block", protectRoute, blockUser);

export default router;
