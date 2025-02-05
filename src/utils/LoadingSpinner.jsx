import { Spin } from 'antd';

const LoadingSpinner = ({ isLoading }) => {
  return <Spin spinning={isLoading} fullscreen tip="Loading..." />;
};

export default LoadingSpinner;
