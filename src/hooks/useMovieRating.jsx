import { useEffect, useState } from 'react';

import ShowErrorNotification from '../notifications/ShowErrorNotification.jsx';
import { getValidGuestSession, sendRating } from '../api/apiConfig.jsx';
import ShowInfoNotification from '../notifications/ShowInfoNotification.jsx';

const useMovieRating = (movieId, onUpdateRatedMovies) => {
  const [rating, setRating] = useState(0);
  const [isRated, setIsRated] = useState(false);

  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem('rated_movies')) || {};
    if (savedRatings[movieId]) {
      setRating(savedRatings[movieId]);
      setIsRated(true);
    }
  }, [movieId]);

  const handleRateChange = async (value) => {
    if (isRated) {
      ShowErrorNotification('Рейтинг уже установлен и не может быть изменён');
      return;
    }

    setRating(value);

    const savedRatings = JSON.parse(localStorage.getItem('rated_movies')) || {};

    if (value > 0) {
      const guestSessionId = await getValidGuestSession();
      if (!guestSessionId) {
        ShowErrorNotification('Гостевая сессия недоступна');
        return;
      }

      const response = await sendRating(movieId, value, guestSessionId);
      if (response?.success) {
        ShowInfoNotification('Рейтинг успешно отправлен');
        setIsRated(true);
      } else {
        ShowErrorNotification('Не удалось отправить рейтинг');
      }

      savedRatings[movieId] = value;
    } else {
      delete savedRatings[movieId];
      ShowInfoNotification('Рейтинг удалён');
    }

    localStorage.setItem('rated_movies', JSON.stringify(savedRatings));

    if (onUpdateRatedMovies) {
      onUpdateRatedMovies();
    }
  };

  return { rating, isRated, handleRateChange };
};

export default useMovieRating;
