// import { IIngredientData, IIngredient } from "../interfaces";
import { fetchData } from "./baseApi";

const baseURL = process.env.REACT_APP_API_BASE_URL

export async function fetchMeals(skip: number, take: number): Promise<any> {
  const response = await fetchData(`${baseURL}meals?skip=${skip}&take=${take}`, {
    method: "GET",
  });
  console.log(response);
  return response;
}

export async function searchMeal(index: string): Promise<any> {
  const response = await fetchData(`${baseURL}meal/search?name=${index}`, {
    method: "GET",
  });
  console.log(response);
  return response;
}