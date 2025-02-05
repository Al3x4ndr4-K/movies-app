import { Image, Typography } from 'antd';

import { imagePath } from '../../api/apiConfig.jsx';
import MovieDate from '../MovieDate/MovieDate.jsx';
import MovieGenres from '../MovieGenres/MovieGenres.jsx';
import MovieOverview from '../MovieOverview/MovieOverview.jsx';

const { Title } = Typography;

const MovieCard = ({ item, genres = {} }) => {
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
        <MovieDate releaseDate={item?.release_date} firstAirDate={item?.first_air_date} />
        <MovieGenres genreIds={item?.genre_ids} genres={genres} />
        <MovieOverview overview={item?.overview} />
      </div>
    </div>
  );
};

export default MovieCard;
