import { create } from "zustand";
import { INotification } from "../interfaces";

const useNotificationStore = create<INotification>((set) => ({
  notify: false,
  setNotify: (status) => set({ notify: status }),
  message: '',
  setMessage: (newMessage) => set({ message: newMessage })
}));

export default useNotificationStore;