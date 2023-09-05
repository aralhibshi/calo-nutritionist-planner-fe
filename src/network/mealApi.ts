import { IFetchMealsResponse, IMeal, IMealData, IMealGetAPI } from "../interfaces";
import { createData, fetchData } from "./baseApi";
import createError from "http-errors";

const baseURL = process.env.REACT_APP_API_BASE_URL

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

export async function fetchMeals(
  data: IMealGetAPI
): Promise<any> {
  const url = baseURL + `meals?skip=${data.skip}&take=${data.take}`

  if (data.name) {
    const response = await fetchData(`${url}&name=${data.name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log(response);
    return response;
  } else if (data.component_id) {
    const response = await fetchData(`${url}&component_id=${data.component_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log(response);
    return response;
  } else {
    const response = await fetchData(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(response);
    return response;
  }
}

export async function searchMeal(index: string, skip: number): Promise<any> {
  const response = await fetchData(`${baseURL}meal/search?name=${index}&skip=${skip}`, {
    method: "GET",
  });
  console.log(response);
  return response;
}