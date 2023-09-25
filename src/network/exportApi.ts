import { fetchData } from "./baseApi"

const baseURL = process.env.REACT_APP_API_BASE_URL

export async function exportData(
  storeUser: any,
  entity: string,
  data: any
): Promise<any> {
  console.log(storeUser);
  // Verified User
  // const url = baseURL + `data?entity=${entity}s&user_id=${storeUser.username}&user_email=${storeUser.attributes.email}&email_type=${data.email_type}&skip=${data.skip}&take=${data.take}`

  // Unverified User
  const url = baseURL + `data?entity=${entity}s&user_id=${storeUser.username}&user_email=${data.user_email}&email_type=${data.email_type}&skip=${data.skip}&take=${data.take}`

  console.log(url);

  const response = await fetchData(url,
  {
    method: 'GET'
  })

  console.log(response)
  return response;
}