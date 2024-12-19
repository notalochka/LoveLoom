import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Message from "../models/Message.js";
import dotenv from "dotenv";

dotenv.config();

const seedMessage = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Message.deleteMany({});

    console.log("Database deleted successfully with messages");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.disconnect();
  }
};

seedMessage();
