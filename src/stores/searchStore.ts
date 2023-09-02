import { create } from "zustand";
import { ISearchStore } from "../interfaces";

const useSearchStore = create<ISearchStore>((set) => ({
  loading: false,
  setLoading: (load) => set({ loading: load }),
  searchResult: null,
  setSearchResult: (result) => set({ searchResult: result }),

  componentLoading: false,
  setComponentLoading: (componentLoad) => set({ componentLoading: componentLoad }),
  componentSearchResult: null,
  setComponentSearchResult: (componentResult) => set({ componentSearchResult: componentResult })
}));

export default useSearchStore;