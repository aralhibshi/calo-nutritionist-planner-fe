import { IIngredient } from "../interfaces/ingredient";
import {fetchData} from "./base_api"

// Set the base URL for the backend API
const API_BASE_URL = 'https://bdy09cap8a.execute-api.us-east-1.amazonaws.com/dev/v1/';
// const APIs_BASE_URL = 'http://localhost:3000/dev/v1/ingredient/create';

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


// Function to create new ingredient
// export async function createIngredient(ingredient: IngredientInput): Promise<Ingredient> {
//     const response = await fetchData(API_BASE_URL + 'ingredient/create', {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(ingredient), // Convert the object to a JSON string
//     });

//     // Assuming that response.data is a JSON response
//     const responseData = await response.json();
//     console.log(responseData);

//     return responseData;
// }

// export async function createIngredient(ingredient: IngredientInput): Promise<Ingredient> {
//     const response = await fetchData("http://localhost:3000/dev/v1/ingredient/create", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(ingredient), // Convert the object to a JSON string
//     });

//     // Assuming that response.data is a JSON response
//     const responseData = await response.json();
//     console.log(responseData);

//     return responseData;
// }
export async function createIngredient(ingredient: IngredientInput): Promise<IIngredient> {
    const response = await fetchData("http://localhost:3000/dev/v1/ingredient/create", {
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




