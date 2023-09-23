import { create } from "zustand";
import { IUserStore } from "../interfaces";

const userStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (data) => set({ user: data })
}))