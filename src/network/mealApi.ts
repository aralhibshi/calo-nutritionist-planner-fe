// import { IIngredientData, IIngredient } from "../interfaces";
import { fetchData } from "./baseApi";
import { API_BASE_URL } from "../config";

export async function searchMeal(index: string): Promise<any> {
  const response = await fetchData(`${API_BASE_URL}meal/search?name=${index}`, {
    method: "GET",
  });
  console.log(response);
  return response;
}