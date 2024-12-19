import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useComplainStore = create((set) => ({
  complaints: [],
  isLoadingComplaints: false,
  complaintData: null,
  isLoadingComplaint: true,

  getComplainList: async () => {
    try {
      set({ isLoadingComplaints: true });
      const res = await axiosInstance.get("/admin/dashboard/complaints");
      set({ complaints: res.data.complaints });
    } catch (error) {
      set({ complaints: [] });
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ isLoadingComplaints: false });
    }
  },
  getComplainInfo: async (id) => {
    try {
      set({ isLoadingComplaint: true });

      const res = await axiosInstance.get(`/admin/dashboard/complaint/${id}`);
      set({ complaintData: res.data });
    } catch (error) {
      set({ complaintData: null });
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ isLoadingComplaint: false });
    }
  },

  blockUser: async (id) => {
    try {
      const res = await axiosInstance.patch(
        `/admin/dashboard/complaintblock/${id}`
      );
      toast.success(res.data.message);
      set({ complaintData: null });
    } catch (error) {
      toast.error(error.response.data.message || "Failed to unblock user");
    }
  },

  close: async (id) => {
    try {
      const res = await axiosInstance.patch(
        `/admin/dashboard/complaintclose/${id}`
      );
      toast.success(res.data.message);
      set({ complaintData: null });
    } catch (error) {
      toast.error(error.response.data.message || "Failed to unblock user");
    }
  },
}));
