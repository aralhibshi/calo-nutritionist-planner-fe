// import { IIngredientData, IIngredient } from '../interfaces';
import { IComponent, IComponentData, IComponentGetAPI } from '../interfaces';
import { fetchData } from './baseApi';
import createError from 'http-errors';
const baseURL = process.env.REACT_APP_API_BASE_URL

export async function createComponent(
  component: IComponentData
): Promise<IComponent> {
  try {
    const response = await fetchData(`${baseURL}component`, {
      method: 'POST',
      body: JSON.stringify(component),
    });

    console.log(response);
    return response;
  } catch (err) {
    throw createError(500, 'Internal Server Error', {
      details: 'An error occurred while fetching matching component:',
      err,
    });
  }
}

export async function fetchComponents(
  data: IComponentGetAPI
): Promise<any> {
  const url = baseURL + `components?skip=${data.skip}&take=${data.take}`

  if (data.name) {
    const response = await fetchData(`${url}&name=${data.name}`, {
      method: 'GET'
    });

    console.log(response);
    return response;
  } else if (data.ingredient_id) {
    const response = await fetchData(`${url}&ingredient_id=${data.ingredient_id}`, {
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

// export async function updateComponent(
//   component: IComponentData,
//   formData: IComponentData
// ): Promise<IComponent> {
//   try {
//     const id = component.id;
//     delete component.id;
//     console.log(formData);
//     const response = await fetchData(
//       `${baseURL}component/update?id=${id}`,
//       {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       }
//     );

//     console.log(response);

//     return response.data;
//   } catch (err) {
//     throw createError(500, 'Internal Server Error', {
//       details: 'An error occurred while updating the component:',
//       error: err,
//     });
//   }
// }
