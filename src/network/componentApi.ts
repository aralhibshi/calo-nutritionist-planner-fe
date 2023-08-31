// import { IIngredientData, IIngredient } from "../interfaces";
import { IComponent, IComponentData } from "../interfaces";
import { fetchData } from "./baseApi";
import createError from "http-errors";
const baseURL = process.env.REACT_APP_API_BASE_URL


export async function fetchComponents(
  skip: number
): Promise<any> {
  const response = await fetchData(`${baseURL}components?skip=${skip}`, {
    method: "GET",
  });
  console.log(response);
  return response;
}

export async function searchComponent(index: string, skip: number): Promise<any> {
  const response = await fetchData(`${baseURL}component/search?name=${index}&skip=${skip}`, {
    method: "GET",
  });
  console.log(response);
  return response;
}

export async function createComponent(
  component: IComponentData
): Promise<IComponent> {
  try {
    const response = await fetchData(`${baseURL}component`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(component),
    });

    console.log(response);
    return response.data;
  } catch (err) {
    throw createError(500, "Internal Server Error", {
      details: "An error occurred while fetching matching component:",
      err,
    });
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
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       }
//     );

//     console.log(response);

//     return response.data;
//   } catch (err) {
//     throw createError(500, "Internal Server Error", {
//       details: "An error occurred while updating the component:",
//       error: err,
//     });
//   }
// }
