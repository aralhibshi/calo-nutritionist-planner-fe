import { create } from "zustand";
import { IComponentStore } from "../interfaces";

const useComponentStore = create<IComponentStore>((set) => ({
  addOpen: false,
  setAddOpen: (isOpen) => set({ addOpen: isOpen }),
  selectedComponent: null,
  setSelectedComponent: (component) => set({ selectedComponent: component }),
  selectedComponents: [],
  setSelectedComponents: (components) => set({ selectedComponents: components }),
}));

export default useComponentStore;