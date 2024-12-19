import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useNewUsersStore = create((set) => ({
  newUsers: [],
  isLoadingNew: false,
  newUser: null,
  isLoadingUser: true,

  getNewList: async () => {
    try {
      set({ isLoadingNew: true });
      const res = await axiosInstance.get("/admin/dashboard/newlist");
      set({ newUsers: res.data.newUsers });
    } catch (error) {
      set({ newUsers: [] });
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ isLoadingNew: false });
    }
  },
  getNewUser: async (id) => {
    try {
      set({ isLoadingUser: true });

      const res = await axiosInstance.get(`/admin/dashboard/newuser/${id}`);
      set({ newUser: res.data.newUser });
    } catch (error) {
      set({ newUser: [] });
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ isLoadingUser: false });
    }
  },

  verifyUser: async (id) => {
    try {
      const res = await axiosInstance.patch(`/admin/dashboard/verify/${id}`);
      toast.success(res.data.message);
      set({ blockedUser: null });
    } catch (error) {
      toast.error(error.response.data.message || "Failed to unblock user");
    }
  },
  blockUser: async (id) => {
    try {
      const res = await axiosInstance.patch(`/admin/dashboard/block/${id}`);
      toast.success(res.data.message);
      set({ blockedUser: null });
    } catch (error) {
      toast.error(error.response.data.message || "Failed to unblock user");
    }
  },
}));
