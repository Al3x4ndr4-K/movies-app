import { Alert } from 'antd';

const ErrorAlert = ({ message }) => {
  if (!message) return null;

  return <Alert message={message} type="error" showIcon style={{ marginBottom: '20px' }} />;
};

export default ErrorAlert;
