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