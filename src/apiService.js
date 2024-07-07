const apiUrl = process.env.REACT_APP_API_URL;

// Function to handle API calls using fetch
// Function to handle API calls using fetch
async function fetchData(endpoint) {
    const url = `${apiUrl}${endpoint}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Resource not found (404)');
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
  async function postData(endpoint, data) {
    const url = `${apiUrl}${endpoint}`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  }
  
  export { fetchData, postData };