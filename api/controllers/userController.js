import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";
import Complaint from "../models/Complaint.js";

export const updateProfile = async (req, res) => {
  try {
    const { image, ...otherData } = req.body;

    let updatedData = otherData;

    if (image) {
      if (image.startsWith("data:image")) {
        try {
          const uploadResponse = await cloudinary.uploader.upload(image);
          updatedData.image = uploadResponse.secure_url;
        } catch (error) {
          console.error("Error uploading image:", uploadError);

          return res.status(400).json({
            success: false,
            message: "Error uploading image",
          });
        }
      }
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, {
      new: true,
    });
    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log("Error in updateProfile: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const blockUser = async (req, res) => {
  try {
    const { userId, reasons, additionalInfo } = req.body;
    const currentUserId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const currentUser = await User.findById(currentUserId);
    const userToBlock = await User.findById(userId);

    if (!currentUser || !userToBlock) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!currentUser.blocked.includes(userId)) {
      currentUser.blocked.push(userId);
    }

    currentUser.matches = currentUser.matches.filter(
      (matchId) => matchId.toString() !== userId
    );

    userToBlock.matches = userToBlock.matches.filter(
      (matchId) => matchId.toString() !== currentUserId
    );

    const complaint = new Complaint({
      user: currentUserId,
      blockedUser: userId,
      reasons,
      additionalInfo,
    });

    await complaint.save();

    await currentUser.save();
    await userToBlock.save();

    res.status(200).json({ message: "User blocked successfully" });
  } catch (error) {
    console.error("Error blocking user:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
