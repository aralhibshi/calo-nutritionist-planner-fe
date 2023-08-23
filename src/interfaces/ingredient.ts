export interface ICreateIngredientInput {
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