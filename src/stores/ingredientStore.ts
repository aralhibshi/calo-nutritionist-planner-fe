import { create } from "zustand";
import { IIngredientStore } from "../interfaces";

const useIngredientStore = create<IIngredientStore>((set) => ({
  addOpen: false,
  setAddOpen: (isOpen) => set({ addOpen: isOpen }),
  selectedIngredient: null,
  setSelectedIngredient: (ingredient) => set({ selectedIngredient: ingredient }),
  selectedIngredients: [],
  setSelectedIngredients: (ingredients) => set({ selectedIngredients: ingredients }),
  decimalData: {
    price: 0,
    protein: 0,
    carbs: 0,
    fats: 0
  },
  setDecimalData: (data) => set({ decimalData: data })
}));

export default useIngredientStore;