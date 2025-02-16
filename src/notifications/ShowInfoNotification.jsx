import { notification } from 'antd';

const ShowInfoNotification = (message) => {
  notification.info({
    message: 'Информация',
    description: message,
    placement: 'topRight',
    duration: 3,
  });
};

export default ShowInfoNotification;
