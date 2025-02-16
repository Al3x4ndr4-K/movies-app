import { Alert } from 'antd';

const WarningAlert = ({ message, onClose }) => {
  if (!message) return null;

  return <Alert message={message} type="warning" showIcon closable onClose={onClose} banner={true} />;
};

export default WarningAlert;
