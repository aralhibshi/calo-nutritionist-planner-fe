export interface IIngredient {
    name: string;
    category?: string;
    description?: string;
    price: number;
    protein: number;
    fats: number;
    carbs: number;
    unit: string;
}