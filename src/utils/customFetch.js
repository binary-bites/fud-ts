// Return a function from the hook that can be used to perform the fetch operation.
export async function customFetch(url, method, body, token) {
  // Define headers
  const headers = new Headers({
    'Authorization': `Bearer ${token}`,
    // 'Content-Type' will be set automatically based on the body type
  });

  // Adjust the headers and body based on whether you're sending JSON or FormData
  let adjustedBody = body;
  if (!(body instanceof FormData)) {
    // If body is not FormData, assume JSON
    headers.set('Content-Type', 'application/json');
    adjustedBody = JSON.stringify(body);
  }

  try {
    // Perform the fetch operation
    const fetchResponse = await fetch(url, {
      method: method,
      headers: headers,
      body: adjustedBody, // Use adjustedBody which may be either FormData or a JSON string
    });

    return fetchResponse;
  } catch (error) {
    console.error("Error in customFetch:", error);
    return {
      ok: false,
      status: 400,
      json: async () => ({ error: error.toString() }),
    };
  }
}

// if no token parameter passed, does not send headers
export async function customGet(url, token) {
  let response = null;

  try {
    // Perform the fetch operation
    let fetchResponse

    if (token == "") {
      const headers = new Headers({
        'Content-Type': 'application/json',
      });

      fetchResponse = await fetch(url, {
        method: "GET",
        headers: headers,
      });
    }

    else {
      //only put authorization in header if a token is provided
      const headers = new Headers({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
      fetchResponse = await fetch(url, {
        method: "GET",
        headers: headers,
      });
    }

    return fetchResponse;
  } catch (error) {
    console.error("Error in customFetch:", error);
    return {
      data: response, // In case of error, response might be null or contain error information if it was parsed
      error: error, // Contains the error object
    };
  }
}
