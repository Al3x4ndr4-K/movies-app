import { Button, Image, Typography } from 'antd';
import { format } from 'date-fns/format';

import { imagePath } from '../../api/apiConfig.jsx';
import { truncateText } from '../../utils/truncateText.jsx';

const { Title, Text } = Typography;

const MovieCard = ({ item, genres = {} }) => {
  const formattedDate =
    item?.release_date || item?.first_air_date
      ? format(new Date(item?.release_date || item?.first_air_date), 'MMMM d, yyyy')
      : 'Дата отсутствует';

  const movieGenres = item?.genre_ids?.map((genreId) => genres[genreId]) || ['Неизвестный жанр'];

  const shortOverview = truncateText(item?.overview || '', 200);

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
        <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {movieGenres.map((genre, index) => (
            <Button key={index} size="small" style={{ backgroundColor: '#FAFAFA', border: '1px solid #D9D9D9' }}>
              {genre}
            </Button>
          ))}
        </div>
        <p style={{ marginTop: '8px', fontSize: '12px' }}>{shortOverview || 'Описание отсутствует'}</p>
      </div>
    </div>
  );
};

export default MovieCard;
