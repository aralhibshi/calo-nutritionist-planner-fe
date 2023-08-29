// import { IIngredientData, IIngredient } from "../interfaces";
import { IComponent, IComponentData } from "../interfaces";
import { fetchData } from "./baseApi";
import createError from "http-errors";
const baseURL = process.env.REACT_APP_API_BASE_URL


export async function fetchComponents(): Promise<any> {
  const response = await fetchData(`${baseURL}components`, {
    method: "GET",
  });
  console.log(response);
  return response;
}

export async function searchComponent(index: string): Promise<any> {
  const response = await fetchData(`${baseURL}component/search?name=${index}`, {
    method: "GET",
  });
  console.log(response);
  return response;
}

export async function createComponent(
  ingredient: IComponentData
): Promise<IComponent> {
  try {
    const response = await fetchData(`${baseURL} `, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingredient),
    });

    console.log(response);
    return response.data;
  } catch (err) {
    throw createError(500, "Internal Server Error", {
      details: "An error occurred while fetching matching ingredient:",
      err,
    });
  }
}
