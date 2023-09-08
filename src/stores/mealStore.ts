import { create } from "zustand";
import { IMealStore } from "../interfaces";

const useMealStore = create<IMealStore>((set) => ({
  addOpen: false,
  setAddOpen: (isOpen) => set({ addOpen: isOpen }),

  selectedMeal: null,
  setSelectedMeal: (meal) => set({ selectedMeal: meal }),
  
  ingredientMeals: null,
  setIngredientMeals: (meals) => set({ ingredientMeals: meals })
}));

export default useMealStore;