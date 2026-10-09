import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { useSocketStore } from "./useSocketStore";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isLoggingIn: false,
  isRegistering: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      set({ authUser: res.data });
      useSocketStore.getState().connectSocket(res.data._id);
    } catch {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  register: async (data) => {
    set({ isRegistering: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      set({ authUser: res.data });
      useSocketStore.getState().connectSocket(res.data._id);
      toast.success("Account created successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      set({ isRegistering: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      useSocketStore.getState().connectSocket(res.data._id);
      toast.success("Logged in successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      useSocketStore.getState().disconnectSocket();
      set({ authUser: null });
      toast.success("Logged out");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  },
}));
