import { Typography } from 'antd';
import { format } from 'date-fns';

const { Text } = Typography;

const MovieDate = ({ releaseDate, firstAirDate }) => {
  const formattedDate =
    releaseDate || firstAirDate ? format(new Date(releaseDate || firstAirDate), 'MMMM d, yyyy') : 'Дата отсутствует';

  return <Text type="secondary">{formattedDate}</Text>;
};

export default MovieDate;
