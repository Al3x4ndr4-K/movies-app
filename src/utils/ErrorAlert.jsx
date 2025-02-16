import { Alert } from 'antd';

const ErrorAlert = ({ message, onClose }) => {
  if (!message || message.trim() === '') return null;

  return (
    <Alert message="Ошибка" description={message} type="error" banner={true} showIcon closable onClose={onClose} />
  );
};

export default ErrorAlert;
