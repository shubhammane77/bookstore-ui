
const apiUrl = process.env.REACT_APP_API_URL;

// Function to handle API calls using fetch
async function fetchData(endpoint, headers = {}) {
  const url = `${apiUrl}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: headers
    });

    if (!response.ok) {
      if (response.status === 404 || response.status === 401) {
        throw new Error(response.status);
      }
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// Function to handle POST requests
async function postData(endpoint, data, headers = {}) {
  const url = `${apiUrl}${endpoint}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 404 || response.status === 401) {
        throw new Error(response.status);
      }
      throw new Error('API call failed');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
}

// Function to handle DELETE requests
async function deleteData(endpoint, headers = {}) {
  const url = `${apiUrl}${endpoint}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404 || response.status === 401) {
        throw new Error(response.status);
      }
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
}

export { fetchData, postData, deleteData };
