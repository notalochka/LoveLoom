import express from "express";
import {
  getBlocked,
  getBlockedUser,
  getNewList,
  getNewUser,
  getComplaints,
  verifyUser,
  unblockUser,
  blockUser,
  getComplaint,
  blockComplainUser,
  closeComplaint,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/blockedlist", getBlocked);
router.get("/newlist", getNewList);
router.get("/complaints", getComplaints);

router.get("/blocked/:id", getBlockedUser);
router.get("/newuser/:id", getNewUser);
router.get("/complaint/:id", getComplaint);

router.patch("/verify/:id", verifyUser);
router.patch("/unblock/:id", unblockUser);
router.patch("/block/:id", blockUser);

router.patch("/complaintblock/:id", blockComplainUser);
router.patch("/complaintclose/:id", closeComplaint);

export default router;
