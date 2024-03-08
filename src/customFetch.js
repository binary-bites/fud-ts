// Return a function from the hook that can be used to perform the fetch operation.
export default async function customFetch(url, method, body, token) {
  // Define headers
  const headers = new Headers({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  });

  let response = null;
  try {
    // Perform the fetch operation
    const fetchResponse = await fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    });

    return fetchResponse;
  } catch (error) {
    console.error("Error in customFetch:", error);
    return {
      data: response, // In case of error, response might be null or contain error information if it was parsed
      error: error, // Contains the error object
    };
  }
}

export async function customGet(url, token) {
  // Define headers
  const headers = new Headers({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  });

  let response = null;
  try {
    // Perform the fetch operation
    const fetchResponse = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    return fetchResponse;
  } catch (error) {
    console.error("Error in customFetch:", error);
    return {
      data: response, // In case of error, response might be null or contain error information if it was parsed
      error: error, // Contains the error object
    };
  }
}
