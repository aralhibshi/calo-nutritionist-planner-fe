// import { IIngredientData, IIngredient } from "../interfaces";
import { fetchData } from "./baseApi";

const baseURL = process.env.REACT_APP_API_BASE_URL

export async function searchComponent(index: string): Promise<any> {
  const response = await fetchData(`${baseURL}component/search?name=${index}`, {
    method: "GET",
  });
  console.log(response);
  return response;
}