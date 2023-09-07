import { IMeal, IMealData, IMealGetAPI } from '../interfaces';
import { fetchData } from './baseApi';
import createError from 'http-errors';

const baseURL = process.env.REACT_APP_API_BASE_URL

export async function createMeal(
  component: IMealData
): Promise<IMeal> {
  const response = await fetchData(`${baseURL}meal`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(component),
  });

  console.log(response);
  return response;
}

export async function fetchMeals(
  data: IMealGetAPI
): Promise<any> {
  const url = baseURL + `meals?skip=${data.skip}&take=${data.take}`

  if (data.name) {
    const response = await fetchData(`${url}&name=${data.name}`,
    {
      method: 'GET'
    })

    console.log(response);
    return response;
  } else if (data.ingredient_id) {
    const response = await fetchData(`${url}&ingredient_id=${data.ingredient_id}`,
    {
      method: 'GET'
    })

    console.log(response)
    return response;
  } else if (data.component_id) {
    const response = await fetchData(`${url}&component_id=${data.component_id}`,
    {
      method: 'GET'
    })

    console.log(response);
    return response;
  } else {
    const response = await fetchData(url,
    {
      method: 'GET'
    });

    console.log(response);
    return response;
  }
}

export async function searchMeal(index: string, skip: number): Promise<any> {
  const response = await fetchData(`${baseURL}meal/search?name=${index}&skip=${skip}`,
  {
    method: 'GET'
  });

  console.log(response);
  return response;
}

export async function updateMeal(
  meal: IMealData,
  formData: IMealData
): Promise<IMeal> {
  const id = meal.id;
  delete meal.id;
  console.log("update formdata",formData);

  const response = await fetchData(
    `${baseURL}meal/update?id=${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }
  );

  console.log(response);

  return response.data;
}