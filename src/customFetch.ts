// Define a type for the method argument
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// Optionally, define an interface for the body parameter if you expect a specific structure
interface RequestBody {
  [key: string]: any; // This allows any key with any value type, adjust according to your needs
}

export default async function customFetch(url: string, method: RequestMethod, body: RequestBody, token: string): Promise<Response | { data: null | Response; error: any }> {
  // Define headers
  const headers = new Headers({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  });

  let response: Response | null = null;
  try {
    // Perform the fetch operation
    const fetchResponse = await fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    });
    console.log(fetchResponse)
    return fetchResponse;
  } catch (error) {
    console.error("Error in customFetch:", error);
    return {
      data: response, // In case of error, response might be null or contain error information if it was parsed
      error: error, // Contains the error object
    };
  }
}

export async function customGet(url: string, token: string): Promise<Response | { data: null | Response; error: any }> {
  // Define headers
  const headers = new Headers({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  });

  let response: Response | null = null;
  try {
    // Perform the fetch operation
    const fetchResponse = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    return fetchResponse;
  } catch (error) {
    console.error("Error in customGet:", error);
    return {
      data: response, // In case of error, response might be null or contain error information if it was parsed
      error: error, // Contains the error object
    };
  }
}
