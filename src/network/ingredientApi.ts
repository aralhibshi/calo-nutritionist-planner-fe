import { IIngredientData, IIngredient, IIngredientGetAPI } from '../interfaces';
import { fetchData } from './baseApi';

const baseURL = process.env.REACT_APP_API_BASE_URL;

export async function createIngredient(
  ingredient: IIngredientData
): Promise<IIngredient> {
  const response = await fetchData(`${baseURL}ingredient`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ingredient),
  });

  console.log(response);
  return response.data;
}

export async function fetchIngredients(
  data: IIngredientGetAPI
): Promise<any> {
  const url = baseURL + `ingredients?skip=${data.skip}&take=${data.take}`

  if (data.name) {
    const response = await fetchData(`${url}&name=${data.name}`,
    {
      method: 'GET'
    });

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

export async function updateIngredient(
  ingredient: IIngredientData,
  formData: IIngredientData
): Promise<IIngredient> {
  const id = ingredient.id;
  delete ingredient.id;

  console.log(formData);

  const response = await fetchData(`${baseURL}ingredient/update?id=${id}`,
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData),
  }
);

  console.log(response);
  return response.data;
}
