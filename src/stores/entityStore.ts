import { create } from "zustand";
import { IEntityStore } from "../interfaces";

const useEntityStore = create<IEntityStore>((set) => ({
  entity: 'ingredient',
  setEntity: (ent) => set({ entity: ent }),
  entityCount: 0,
  setEntityCount: (count) => set({ entityCount: count}),
  skip: 0,
  setSkip: (amount) => set({ skip: amount }),
  searchSkip: 0,
  setSearchSkip: (amount) => set({ searchSkip: amount }),
  take: 9,
  setTake: (amount) => set({ take: amount }),
  setTakeCondition: (setTake) => {
    const height = window.innerHeight;
    if (height >= 600 && height <= 640) {
      setTake(5);
    } else if (height > 640 && height <= 740) {
      setTake(6);
    } else if (height > 740 && height <= 840) {
      setTake(8);
    } else if (height > 840 && height <= 942) {
      setTake(10);
    } else if (height > 942 && height <= 1045) {
      setTake(12);
    } else if (height > 1045 && height <= 1150) {
      setTake(14);
    } else if (height > 1150 && height <= 1215) {
      setTake(16);
    } else if (height > 1215 && height <= 1260) {
      setTake(17);
    } else if (height > 1260 && height <= 1360) {
      setTake(18);
    } else if (height > 1360 && height <= 1375) {
      setTake(19)
    } else if (height > 1375 && height <= 1410) {
      setTake(21);
    } else {
      setTake(21);
    }
  }, 
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  searchCurrentPage: 1,
  setSearchCurrentPage: (page) => set({ searchCurrentPage: page })
}));

export default useEntityStore;