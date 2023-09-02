import { create } from "zustand";
import { IIngredientStore } from "../interfaces";

const useIngredientStore = create<IIngredientStore>((set) => ({
  addOpen: false,
  setAddOpen: (isOpen) => set({ addOpen: isOpen }),
  selectedIngredient: null,
  setSelectedIngredient: (ingredient) => set({ selectedIngredient: ingredient }),
  selectedIngredients: [],
  setSelectedIngredients: (ingredients) => set({ selectedIngredients: ingredients }),
}));

export default useIngredientStore;