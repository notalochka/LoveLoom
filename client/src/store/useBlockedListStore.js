import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useBlockedListStore = create((set) => ({
  blockedUsers: [],
  isLoadingBlocked: false,
  blockedUser: null,
  isLoadingUser: true,

  getBlockedList: async () => {
    try {
      set({ isLoadingBlocked: true });
      const res = await axiosInstance.get("/admin/dashboard/blockedlist");
      set({ blockedUsers: res.data.blockedUsers });
    } catch (error) {
      set({ blockedUsers: [] });
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ isLoadingBlocked: false });
    }
  },
  getBlockedUser: async (id) => {
    try {
      set({ isLoadingUser: true });

      const res = await axiosInstance.get(`/admin/dashboard/blocked/${id}`);
      set({ blockedUser: res.data.blockedUser });
    } catch (error) {
      set({ blockedUser: [] });
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ isLoadingUser: false });
    }
  },
  unblockUser: async (id) => {
    try {
      const res = await axiosInstance.patch(`/admin/dashboard/unblock/${id}`);
      toast.success(res.data.message);
      set({ blockedUser: null });
    } catch (error) {
      toast.error(error.response.data.message || "Failed to unblock user");
    }
  },
}));
