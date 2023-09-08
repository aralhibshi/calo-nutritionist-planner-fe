import createError from 'http-errors';

export async function createData(
  input: RequestInfo,
  init?: RequestInit
): Promise<any> {
  const response = await fetch(input, init);
  try {
    const parsedBody = await response.json();
    return parsedBody;
  } catch (err) {
    throw createError(500, "Internal Server Error", {
      details: "An error occurred while processing the create request",
      err,
    });
  }
}

export async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    const parsedBody = await response.json();
    return parsedBody;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}