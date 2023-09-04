import { IFetchMealsResponse, IMeal, IMealData } from "../interfaces";
import { createData, fetchData } from "./baseApi";
import createError from "http-errors";

const baseURL = process.env.REACT_APP_API_BASE_URL

export async function fetchMeals(
  skip: number
): Promise<any> {
  const response = await fetchData(`${baseURL}meals?skip=${skip}`, {
    method: "GET",
  });
  console.log(response);
  return response;
}

export async function searchMeal(index: string, skip: number): Promise<any> {
  const response = await fetchData(`${baseURL}meal/search?name=${index}&skip=${skip}`, {
    method: "GET",
  });
  console.log(response);
  return response;
}

export async function createMeal(
  component: IMealData
): Promise<IMeal> {
  try {
    const response = await fetchData(`${baseURL}meal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(component),
    });

    console.log(response);
    return response;
  } catch (err) {
    throw createError(500, "Internal Server Error", {
      details: "An error occurred while fetching matching meal:",
      err,
    });
  }
}