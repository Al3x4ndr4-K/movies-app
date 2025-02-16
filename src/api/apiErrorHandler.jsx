import { notification } from 'antd';

export const handleApiError = (error, customMessage) => {
  if (error?.response?.data?.status_message) {
    notification.error({
      message: customMessage,
      description: error.response.data.status_message,
      placement: 'topRight',
      duration: 3,
    });
  } else if (error.message) {
    notification.error({
      message: customMessage,
      description: error.message,
      placement: 'topRight',
      duration: 3,
    });
  } else {
    notification.error({
      message: customMessage,
      description: 'Произошла неизвестная ошибка',
      placement: 'topRight',
      duration: 3,
    });
  }
};
