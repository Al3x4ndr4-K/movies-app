import { notification } from 'antd';

const ShowErrorNotification = (message) => {
  notification.error({
    message: 'Ошибка',
    description: message,
    placement: 'topRight',
    duration: 3,
  });
};

export default ShowErrorNotification;
