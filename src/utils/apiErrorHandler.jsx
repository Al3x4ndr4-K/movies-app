import ErrorAlert from './ErrorAlert.jsx';

const handleApiError = (error, context = 'Ошибка при запросе к API') => {
  const errorMessage = error.response?.data?.status_message || 'Произошла ошибка при загрузке данных';

  return { errorComponent: <ErrorAlert message={`${context}: ${errorMessage}`} />, data: null };
};

export default handleApiError;
