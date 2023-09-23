import { create } from "zustand"
import { ISearchStore } from "../interfaces";

const useSearchStore = create<ISearchStore>((set) => ({
  searchResult: false,
  setSearchResult: (data) => set({ searchResult: data }),
  componentLoading: false,
  setComponentLoading: (componentLoad) => set({ componentLoading: componentLoad }),
  componentSearchResult: null,
  setComponentSearchResult: (componentResult) => set({ componentSearchResult: componentResult }),
  mealLoading: false,
  setMealLoading: (mealLoad) => set({ mealLoading: mealLoad }),
  mealSearchResult: null,
  setMealSearchResult: (mealResult) => set({ mealSearchResult: mealResult }),
  searchCurrentPage: 1,
  setSearchCurrentPage: (page) => set({ searchCurrentPage: page })
}));

export default useSearchStore;