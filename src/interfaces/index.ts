// Ingredient Create - Data
export interface IIngredientData {
  id?: string;
  name: string;
  category?: string;
  description?: string;
  price: number;
  protein: number;
  fats: number;
  carbs: number;
  unit: string;
}

// Ingredient
export interface IIngredient {
  id: string;
  name: string;
  category: string | undefined;
  description: string | undefined;
  price: number;
  protein: number;
  fats: number;
  carbs: number;
  unit: string;
  created_at: Date;
  updated_at: Date;
}

// Ingredient Response
export interface IIngredientResponse {
  count: number;
  data: {
    id: string;
    name: string;
    category: string | undefined;
    description: string | undefined;
    price: number;
    protein: number;
    fats: number;
    carbs: number;
    unit: string;
    created_at: Date;
    updated_at: Date;
  };
}

// Component


export interface IPaginationFooter {
    ingredientsCount: number;
    setSkip: React.Dispatch<React.SetStateAction<number>>;
}

export interface IAddIngredientDialogProps {
  onIngredientAdded: (newIngredient: IIngredientData) => void;
}

// Zustand Ingredient Store
export interface IIngredientStore {
  addOpen: boolean,
  setAddOpen: (isOpen: boolean) => void;
  selectedIngredient: IIngredient | null;
  setSelectedIngredient: (ingredient: IIngredient | null) => void;
}

// Zustand Entity Type Store
export interface ISearchStore {
  searchEntity: string;
  setSearchEntity: (entity: string) => void;
  loading: boolean;
  setLoading: (load: boolean) => void;
  searchResult: null,
  setSearchResult: (result: any) => void
}
