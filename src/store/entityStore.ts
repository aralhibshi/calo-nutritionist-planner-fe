import { create } from "zustand";
import { IEntityStore } from "../interfaces";

const useEntityStore = create<IEntityStore>((set) => ({
  entity: 'ingredient',
  setEntity: (ent) => set({ entity: ent })
}));

export default useEntityStore;