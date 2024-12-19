import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useBlockUserStore = create((set) => ({
  loading: false,
  blockUser: async ({ userId, reasons, additionalInfo }) => {
    try {
      set({ loading: true });
      await axiosInstance.post("/users/block", {
        userId,
        reasons,
        additionalInfo,
      });
      toast.success("User has been blocked successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to block the user. Try again."
      );
    } finally {
      set({ loading: false });
    }
  },
}));
