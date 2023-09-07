import { create } from "zustand";
import { IIngredientStore } from "../interfaces";

const useIngredientStore = create<IIngredientStore>((set) => ({
  addOpen: false,
  setAddOpen: (isOpen) => set({ addOpen: isOpen }),
  selectedIngredient: null,
  setSelectedIngredient: (ingredient) => set({ selectedIngredient: ingredient }),
  selectedIngredients: [],
  setSelectedIngredients: (ingredients) => set({ selectedIngredients: ingredients }),
  editData: {
    price: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    calories: 0,
    rating: 'Normal',
    totalUnit: 0,
    unitType: ''
  },
  setEditData: (data) => set({ editData: data }),
  calories: 0, // New property for calories
  setCalories: (calories) => set({ calories }),
  totalQuantity: 0,
  setTotalQuantity: (totalQuantity) => set({totalQuantity})
}));

export default useIngredientStore;