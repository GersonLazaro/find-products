/**
 * Handle the response from server
 * @param {String} response - Response from server
 * @returns processed response
 */
export const handleResponse = async (response) => {
  if (response.ok) return response.json();
  if (response.status >= 400) {
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error('Internal server error.');
};

/**
 * Handle the error message from server
 * @param {Error} error - Error
 */
export const handleError = (error) => {
  console.error('API failed ' + error);
  throw error;
};
