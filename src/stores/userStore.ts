import { create } from "zustand";
import { IUserStore } from "../interfaces";

const useUserStore = create<IUserStore>((set) => ({
  storeUser: null,
  setStoreUser: (data) => set({ storeUser: data })
}))

export default useUserStore;