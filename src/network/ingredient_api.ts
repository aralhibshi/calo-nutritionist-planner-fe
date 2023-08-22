import { Ingredient } from "../models/ingredient";

// Set the base URL for the backend API
// const API_BASE_URL = 'https://bdy09cap8a.execute-api.us-east-1.amazonaws.com/dev/';

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
      return response;
    } else {
      const errorBody = await response.json();
      const errorMessage = errorBody.error;
      throw Error(errorMessage);
    }
  }

// Function to fetch ingredients from the backend API
export async function fetchIngredients(): Promise<Ingredient[]> {
  const response = await fetchData('/dev/v1/ingredients', { method: 'GET' });
  return response.json();
}
