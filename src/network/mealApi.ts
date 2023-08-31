import { IFetchMealsResponse, IMeal, IMealData } from "../interfaces";
import { createData, fetchData } from "./baseApi";

const baseURL = process.env.REACT_APP_API_BASE_URL

export async function fetchMeals(
  skip: number,
  take: number
): Promise<IFetchMealsResponse> {
  const response = await fetchData(`${baseURL}meals?skip=${skip}&take=${take}`, {
    method: "GET",
  });
  console.log(response);
  return response;
}

export async function searchMeal(
  index: string
): Promise<Array<IMeal>> {
  const response = await fetchData(`${baseURL}meal/search?name=${index}`, {
    method: "GET",
  });
  console.log(response);
  return response;
}

export async function createMeal(
  meal: IMealData
): Promise<any> {
  const response = await createData(`${baseURL}/meal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(meal)
  });

  console.log(response);
  return response.data
}