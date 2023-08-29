import { create } from "zustand";
import { IEntityStore } from "../interfaces";

const useEntityStore = create<IEntityStore>((set) => ({
  entity: 'ingredient',
  setEntity: (ent) => set({ entity: ent }),
  entityCount: 0,
  setEntityCount: (count) => set({ entityCount: count}),
  skip: 0,
  setSkip: (amount) => set({ skip: amount })
}));

export default useEntityStore;