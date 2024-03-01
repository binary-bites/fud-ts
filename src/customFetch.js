import axios from 'axios';


// Return a function from the hook that can be used to perform the fetch operation.
export default async function customFetch (url, method, body, token)  {
  // if (!currentUser) {
  //   throw new Error("No user is currently signed in.");
  // }

  // const token = await currentUser.getIdToken(true); // Force token refresh
  // console.log("Token:", token);
  try {
    const response = await axios({
      url: url,
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: body,
    });

    return response.data;
  } catch (error) {
    console.error("Error in fetchWithAuth:", error);
    throw error;
  }
};





