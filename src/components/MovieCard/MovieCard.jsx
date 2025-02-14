import { Image, Rate, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { getValidGuestSession, imagePath, sendRating } from '../../api/apiConfig.jsx';
import MovieDate from '../MovieDate/MovieDate.jsx';
import MovieGenres from '../MovieGenres/MovieGenres.jsx';
import MovieOverview from '../MovieOverview/MovieOverview.jsx';

const { Title } = Typography;

const MovieCard = ({ item, genres = {}, onUpdateRatedMovies }) => {
  const [rating, setRating] = useState(0);

  const ratingValue = Number(item?.vote_average).toFixed(1);

  const ratingColor = (ratingValue) => {
    if (ratingValue >= 7) return '#66E900';
    if (ratingValue >= 5) return '#E9D100';
    if (ratingValue >= 3) return '#E97E00';
    return '#E90000';
  };

  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem('rated_movies')) || {};
    if (savedRatings[item.id]) {
      setRating(savedRatings[item.id]);
    }
  }, [item.id]);

  const handleRateChange = async (value) => {
    setRating(value);

    const savedRatings = JSON.parse(localStorage.getItem('rated_movies')) || {};
    if (value > 0) {
      const guestSessionId = await getValidGuestSession();
      if (!guestSessionId) {
        console.error('Гостевая сессия недоступна');
        return;
      }

      const response = await sendRating(item.id, value, guestSessionId);
      if (response?.success) {
        console.log(`Рейтинг ${value} успешно отправлен для фильма ID ${item.id}`);
      } else {
        console.error('Не удалось отправить рейтинг');
      }

      savedRatings[item.id] = value;
    } else {
      delete savedRatings[item.id];
      console.log(`Рейтинг удалён для фильма ID ${item.id}`);
    }
    localStorage.setItem('rated_movies', JSON.stringify(savedRatings));

    if (onUpdateRatedMovies) {
      onUpdateRatedMovies();
    }
  };

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
        fallback={'https://dummyimage.com/183x281/8f8f8f/ffffff&text=No+image'}
        style={{
          flexShrink: 0,
          width: '183px',
          height: '281px',
          objectFit: 'cover',
        }}
        preview={false}
      />
      <div style={{ flex: 1 }}>
        <Title style={{ width: '84%' }} level={5}>
          {item?.title || item?.name}
        </Title>
        <MovieDate releaseDate={item?.release_date} firstAirDate={item?.first_air_date} />
        <MovieGenres genreIds={item?.genre_ids} genres={genres} />
        <MovieOverview overview={item?.overview} />
        <Rate value={rating} onChange={handleRateChange} count={10} />
        <div
          style={{
            position: 'absolute',
            top: '22px',
            right: '25px',
            fontSize: '12px',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background: 'transparent',
            border: '2px solid',
            borderColor: ratingColor(ratingValue),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {ratingValue}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
