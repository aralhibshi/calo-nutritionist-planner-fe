import { ICreateIngredientInput, IIngredient } from "../interfaces/ingredient";
import {fetchData} from "./baseApi"
import createError from 'http-errors';
import { API_BASE_URL } from '../config'



// Function to fetch ingredients from the backend API
export async function fetchIngredients(): Promise<IIngredient[]> {
  const response = await fetchData(API_BASE_URL + 'ingredients', { method: 'GET' });
  console.log(response.data)
  return response.data;
}

export async function createIngredient(ingredient: ICreateIngredientInput): Promise<IIngredient> {
    try{
    const response = await fetchData(API_BASE_URL + "ingredient/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(ingredient),
    });

        console.log(response);
        return response.data;
    } catch (err) {
        throw createError(500, 'Internal Server Error', {
            details: 'An error occurred while fetching matching ingredient:', err
          });
    }
}

export async function searchIngredient(index: string, entity: string): Promise<Array<IIngredient>> {
    try {
        const response = await fetchData(`${API_BASE_URL}ingredient/search?name=${index}`, {
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
// API_BASE_URL + 'ingredient/update?' + ingredient.id
export async function updateIngredient(ingredient:ICreateIngredientInput, formData: ICreateIngredientInput): Promise<IIngredient> {
    try {
      const id = ingredient.id
      delete ingredient.id
      console.log(formData)
      const response = await fetchData(`${API_BASE_URL}ingredient/update?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      console.log(response);
  
      return response.data;
    } catch (err) {
      throw createError(500, 'Internal Server Error', {
        details: 'An error occurred while updating the ingredient:',
        error: err
      });
    }
  }