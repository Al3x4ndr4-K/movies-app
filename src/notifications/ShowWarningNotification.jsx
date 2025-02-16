import { notification } from 'antd';

const ShowWarningNotification = (message) => {
  notification.warning({
    message: 'Предупреждение',
    description: message,
    placement: 'topRight',
    duration: 3,
  });
};

export default ShowWarningNotification;
