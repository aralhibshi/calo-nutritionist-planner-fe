import { IIngredientData, IIngredient } from "../interfaces";
import { fetchData } from "./baseApi";
import createError from "http-errors";

const baseURL = process.env.REACT_APP_API_BASE_URL;

// Function to fetch ingredients from the backend API
export async function fetchIngredients(skip: number): Promise<any> {
  const response = await fetchData(`${baseURL}ingredients?skip=${skip}`, {
    method: "GET",
  });
  console.log(response);
  return response;
}

export async function createIngredient(
  ingredient: IIngredientData
): Promise<IIngredient> {
  try {
    const response = await fetchData(`${baseURL}ingredient`, {
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

export async function searchIngredient(
  index: string,
  skip: number
): Promise<Array<IIngredient>> {
  try {
    const response = await fetchData(
      `${API_BASE_URL}ingredient/search?name=${index}&skip=${skip}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    throw createError(500, "Internal Server Error", {
      details: "An error occurred while fetching matching ingredient:",
      err,
    });
  }
}

export async function updateIngredient(
  ingredient: IIngredientData,
  formData: IIngredientData
): Promise<IIngredient> {
  try {
    const id = ingredient.id;
    delete ingredient.id;
    console.log(formData);
    const response = await fetchData(
      `${baseURL}ingredient/update?id=${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    console.log(response);

    return response.data;
  } catch (err) {
    throw createError(500, "Internal Server Error", {
      details: "An error occurred while updating the ingredient:",
      error: err,
    });
  }
}
