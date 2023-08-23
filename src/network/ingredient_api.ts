import { ICreateIngredientInput, IIngredient } from "../interfaces/ingredient";
import {fetchData} from "./base_api"
import createError from 'http-errors';
import { API_BASE_URL } from '../config'


// Set the base URL for the backend API

// Function to fetch ingredients from the backend API
export async function fetchIngredients(): Promise<IIngredient[]> {
  const response = await fetchData(API_BASE_URL + 'ingredients', { method: 'GET' });
  console.log(response.data)
  return response.data;
}

export interface IngredientInput {
    name: string;
    category?: string;
    description?: string;
    price: number;
    protein: number;
    fats: number;
    carbs: number;
    unit: string;
}

export async function createIngredient(ingredient: ICreateIngredientInput): Promise<IIngredient> {
    // const response = await fetchData("http://localhost:3000/dev/v1/ingredient", {
    const response = await fetchData("http://localhost:3000/dev/v1/ingredient", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(ingredient),
    });

    console.log(response);
    if (response.statusCode !== 201) {
        // Handle non-successful response status (e.g., 404, 500)
        throw new Error(`HTTP error! Status: ${response.statusCode}`);
    }

    try {
        const responseData = await response;
        console.log(responseData);
        return responseData;
    } catch (error) {
        // Handle JSON parsing error
        console.error('Error parsing JSON response:', error);
        throw new Error('Error parsing JSON response');
    }
}

export async function searchIngredient(index: string, entity: string): Promise<Array<IIngredient>> {
    try {
        const response = await fetchData(API_BASE_URL + 'ingredient/search?name=' + index, {
        // const response = await fetchData(`http://localhost:3000/dev/v1/${entity}/search?name=${index}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response);

    return response.data;
    } catch (err) {
        throw createError(500, 'Internal Server Error', {
            details: 'An error occurred while fetching matching ingredient:', err
          });
    }
}