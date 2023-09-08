// Ingredient Create/Update - Data
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
export interface IFetchIngredientsResponse {
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
export interface IComponent{
  id: string;
  name: string;
  category?: string;
  description?: string;
  components_ingredients: Array<IComponentIngredient>
  unit: string;
  created_at: Date;
  updated_at: Date;
}

// Component Create/Update - Data
export interface IComponentData {
  id?: string
  name: string;
  category?: string;
  description?: string;
  ingredients?: Array<IComponentIngredientDataArray>
  unit: string;
}

// Component Ingredient
export interface IComponentIngredient{
  id: string;
  component_id: string;
  ingredient_id:string;
  ingredient_quantity:number;
  created_at: Date;
  updated_at: Date;
  ingredient: IIngredient
}

// ComponentIngredient Create/Update (Ingredient Array) - Data
export interface IComponentIngredientDataArray {
  ingredient_id: string;
  ingredient_quantity: number
}

// Meal
export interface IMeal {
  id: string;
  name: string;
  description: string;
  size: string;
  unit: string;
  created_at: Date
  updated_at: Date
  meals_components: Array<IMealComponent>
}

// Fetch Meals Response
export interface IFetchMealsResponse {
  count: number;
  data: {
    id: string;
    name: string;
    description: string;
    size: string;
    unit: string;
    created_at: Date
    updated_at: Date
    meals_components: Array<IMealComponent> 
  }
}

// Meal Create/Update - Data
export interface IMealData {
  id?: string
  name: string
  description?: string;
  components?: Array<IMealComponentDataArray>
  unit: string;
  size: string
}

// Meal Component
export interface IMealComponent {
  id: string;
  meal_id: string;
  component_id: string;
  component_quantity: number;
  created_at: Date;
  updated_at: Date;
  component: IComponent 
}

// MealComponent Create/Update (Component Array) - Data
export interface IMealComponentDataArray {
  component_id: string;
  component_quantity: number
}

// Props --

// Add Ingredient Dialog/Modal
export interface IAddIngredientDialogProps {
  onIngredientAdded: (newIngredient: IIngredientData) => void;
}

// Add Component Dialog/Modal
export interface IAddComponentDialogProps {
  onComponentAdded: (newComponent: IComponentData) => void;
}

// Add Meal Dialog/Modal
export interface IAddMealDialogProps {
  onMealAdded: (newMeal: IMealData) => void;
}

// Zustand --

// Entity Store
export interface IEntityStore {
  entity: string;
  setEntity: (ent: string) => void;
  entityCount: number;
  setEntityCount: (count: number) => void;
  skip: number;
  setSkip: (amount: number) => void;
  take: number;
  setTake: (amount: number) => void;
  setTakeCondition: (setTake: any) => void, 
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

// Search Store
export interface ISearchStore {
  loading: boolean;
  setLoading: (load: boolean) => void;
  searchResult: any;
  setSearchResult: (result: any) => void

  componentLoading: boolean;
  setComponentLoading: (load: boolean) => void;
  componentSearchResult: any;
  setComponentSearchResult: (result: any) => void

  mealLoading: boolean;
  setMealLoading: (load: boolean) => void;
  mealSearchResult: any;
  setMealSearchResult: (result: any) => void
}

// Nutriton
export interface IEditData {
  price: number;
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
  rating: string;
  totalUnit: number;
  unitType: string;  
}

// Ingredient Store
export interface IIngredientStore {
  addOpen: boolean;
  setAddOpen: (isOpen: boolean) => void;
  selectedIngredient: IIngredient | null;
  setSelectedIngredient: (ingredient: IIngredient | null) => void;
  selectedIngredients: IComponentIngredient[];
  setSelectedIngredients: (ingredients: IComponentIngredient[]) => void;
  editData: IEditData
  setEditData: (data: any) => void;
  calories: number; // New property for calories
  setCalories: (calories: number) => void; // New setter for calories
}

// Component Details
export interface IComponentIngredientDetails {
  ingredient_id: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  price: number;
  quantity: number;
}

// Component Store
export interface IComponentStore {
  addOpen: boolean;
  setAddOpen: (isOpen: boolean) => void;

  selectedComponent: IComponent | null;
  setSelectedComponent: (component: IComponent | null) => void;

  selectedComponents: IMealComponent[];
  setSelectedComponents: (components: IMealComponent[]) => void;

  ingredientComponents: any,
  setIngredientComponents: (components: IComponent[]) => void;
}

// Meal Store
export interface IMealStore {
  addOpen: boolean;
  setAddOpen: (isOpen: boolean) => void;

  selectedMeal: IMeal | null;
  setSelectedMeal: (meal: IMeal | null) => void;

  ingredientMeals: any,
  setIngredientMeals: (meals: IMeal[]) => void;
}

// Notification Store
export interface INotification {
  notify: boolean;
  setNotify: (status: boolean) => void;
  message: string;
  setMessage: (newMessage: string) => void;
}

// APIs ---

// Ingredient Get
export interface IIngredientGetAPI {
  skip: number;
  take: number;
  name?: string;
}

// Component Get
export interface IComponentGetAPI {
  skip: number;
  take: number;
  name?: string;
  ingredient_id?: string;
}

// Meal Get
export interface IMealGetAPI {
  skip: number;
  take: number;
  name?: string;
  ingredient_id?: string;
  component_id?: string;
}