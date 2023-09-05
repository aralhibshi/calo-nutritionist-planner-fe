import { IIngredientData, IIngredient, IIngredientGetAPI } from '../interfaces';
import { fetchData } from './baseApi';
import createError from 'http-errors';

const baseURL = process.env.REACT_APP_API_BASE_URL;

export async function createIngredient(
  ingredient: IIngredientData
): Promise<IIngredient> {
  try {
    const response = await fetchData(`${baseURL}ingredient`, {
      method: 'POST',
      body: JSON.stringify(ingredient),
    });

    console.log(response);
    return response.data;
  } catch (err) {
    throw createError(500, 'Internal Server Error', {
      details: 'An error occurred while fetching matching ingredient:',
      err,
    });
  }
}

export async function fetchIngredients(
  data: IIngredientGetAPI
): Promise<any> {
  const url = baseURL + `ingredients?skip=${data.skip}&take=${data.take}`

  if (data.name) {
    const response = await fetchData(`${url}&name=${data.name}`, {
      method: 'GET'
    });

    console.log(response);
    return response;
  } else {
    const response = await fetchData(url, {
      method: 'GET'
    });

    console.log(response);
    return response;
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
        method: 'PUT',
        body: JSON.stringify(formData),
      }
    );

    console.log(response);

    return response.data;
  } catch (err) {
    throw createError(500, 'Internal Server Error', {
      details: 'An error occurred while updating the ingredient:',
      error: err,
    });
  }
}
