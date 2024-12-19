import User from "../models/User.js";
import Complaint from "../models/Complaint.js";

export const getBlocked = async (req, res) => {
  try {
    const blockedUsers = await User.find({ isBlocked: true }).select(
      "name _id"
    );
    const result = blockedUsers.map((user) => ({
      name: user.name,
      _id: user._id,
    }));
    res.status(200).json({
      success: true,
      blockedUsers: result,
    });
  } catch (error) {
    console.log("Error in getBlocked Controller: ", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getNewList = async (req, res) => {
  try {
    const newUsers = await User.find({
      isVerified: false,
      isBlocked: false,
    }).select("name _id");
    const result = newUsers.map((user) => ({
      name: user.name,
      _id: user._id,
    }));
    res.status(200).json({
      success: true,
      newUsers: result,
    });
  } catch (error) {
    console.log("Error in getNewList Controller: ", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      status: "pending",
    }).select("_id");

    const result = complaints.map((complaint) => ({
      _id: complaint._id,
    }));
    res.status(200).json({
      success: true,
      complaints: result,
    });
  } catch (error) {
    console.log("Error in getComplaints Controller: ", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getBlockedUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findById(id).select(
      "name email age gender image bio genderPreference isVerified createdAt updatedAt"
    );
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      blockedUser: result,
    });
  } catch (error) {
    console.log("Error in getBlockedUser Controller: ", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getNewUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findById(id).select(
      "name email age gender image bio genderPreference createdAt updatedAt"
    );
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      newUser: result,
    });
  } catch (error) {
    console.log("Error in getNewUser Controller: ", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await Complaint.findById(id)
      .populate("user", "_id name email")
      .populate(
        "blockedUser",
        "_id name email age gender image bio genderPreference isVerified"
      )
      .exec();

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }
    const complaintCount = await Complaint.countDocuments({
      blockedUser: complaint.blockedUser._id,
    });
    res.status(200).json({
      success: true,
      complaint: complaint,
      complaintCount: complaintCount,
    });
  } catch (error) {
    console.log("Error in getComplain Controller: ", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const unblockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Unblocked user successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in unblockUser Controller:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isVerified: true },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Verified user successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in verifykUser Controller:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blocked user successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in blockUser Controller:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const blockComplainUser = async (req, res) => {
  const { id } = req.params;

  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    await User.findByIdAndUpdate(
      complaint.blockedUser,
      { isBlocked: true },
      { new: true }
    );

    complaint.status = "resolved";
    await complaint.save();

    res.status(200).json({
      message: "User blocked and complaint resolved",
      complaint,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

export const closeComplaint = async (req, res) => {
  const { id } = req.params;

  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = "resolved";
    await complaint.save();

    res.status(200).json({
      message: "Complaint marked as resolved",
      complaint,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
