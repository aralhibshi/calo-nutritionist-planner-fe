import { create } from "zustand";
import { ISearchStore } from "../interfaces";

const useSearchStore = create<ISearchStore>((set) => ({
  loading: false,
  setLoading: (load) => set({ loading: load }),
  searchResult: null,
  setSearchResult: (result) => set({ searchResult: result })
}));

export default useSearchStore;