// selectedIngredientStore.js

import {create} from 'zustand';
import { ICreateIngredientInput, IIngredient } from '../../interfaces/ingredient';

interface ISelectedIngredientStore {
  selectedIngredient: IIngredient | null;
  setSelectedIngredient: (ingredient: IIngredient | null) => void;
}

const useSelectedIngredientStore = create<ISelectedIngredientStore>((set) => ({
  selectedIngredient: null,
  setSelectedIngredient: (ingredient) => set({ selectedIngredient: ingredient }),
}));

export default useSelectedIngredientStore;
