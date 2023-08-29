import { create } from "zustand";
import { ISearchStore } from "../interfaces";

const useSearchStore = create<ISearchStore>((set) => ({
  searchEntity: 'ingredient',
  setSearchEntity: (entity) => set({ searchEntity: entity }),
  loading: false,
  setLoading: (load) => set({ loading: load }),
  searchResult: null,
  setSearchResult: (result) => set({ searchResult: result })
}));

export default useSearchStore;
