import { Alert } from 'antd';

const InfoAlert = ({ message, onClose }) => {
  if (!message) return null;

  return <Alert message={message} type="info" showIcon closable onClose={onClose} banner={true} />;
};

export default InfoAlert;
