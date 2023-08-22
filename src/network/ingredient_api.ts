import { Ingredient } from "../models/ingredient";
import {fetchData} from "./base_api"

// Set the base URL for the backend API
const API_BASE_URL = 'https://bdy09cap8a.execute-api.us-east-1.amazonaws.com/dev/v1/ingredients';
// const API_BASE_URL = 'http://localhost:3000/dev/v1/ingredients';


// Function to fetch ingredients from the backend API
export async function fetchIngredients(): Promise<Ingredient[]> {
  const response = await fetchData(API_BASE_URL, { method: 'GET' });
  console.log(response.data)
  return response.data;
}
