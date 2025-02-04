import { Image, Typography } from 'antd';
import { format } from 'date-fns/format';

import { imagePath } from '../../api/apiConfig.jsx';

const { Title, Text } = Typography;

const MovieCard = ({ item }) => {
  const formattedDate =
    item?.release_date || item?.first_air_date
      ? format(new Date(item?.release_date || item?.first_air_date), 'MMMM d, yyyy')
      : 'Дата отсутствует';

  return (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
        boxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.2)',
      }}
    >
      <Image
        src={`${imagePath}/${item?.poster_path}`}
        alt={item?.title || item?.name}
        style={{
          flexShrink: 0,
          width: '183px',
          height: '281px',
          objectFit: 'cover',
        }}
        preview={false}
      />
      <div style={{ flex: 1 }}>
        <Title level={5}>{item?.title || item?.name}</Title>
        <Text type="secondary">{formattedDate}</Text>
        <p style={{ marginTop: '8px', fontSize: '12px' }}>
          {item?.overview ? item.overview.slice(0, 100) + '...' : 'Описание отсутствует'}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
