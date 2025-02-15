export const handleError = (error, defaultMessage = 'An unexpected error occurred', setError) => {
  let errorMessage = defaultMessage;

  if (error.response) {
    errorMessage = error.response.data?.status_message || `Server error: ${error.response.status}`;
  } else if (error.request) {
    errorMessage = 'Network error: Please check your internet connection';
  } else {
    errorMessage = error.message || defaultMessage;
  }

  console.error('Error:', errorMessage);
  setError(errorMessage);
};
