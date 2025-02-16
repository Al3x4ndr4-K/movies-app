import { useEffect, useState } from 'react';
import axios from 'axios';

import { apiKey, baseUrl, getValidGuestSession } from '../api/apiConfig.jsx';

import { useFetchMovies } from './useFetchMovies.jsx';

export const useRatedMovies = () => {
  const { genres = [], isLoading: genresLoading, error: genresError } = useFetchMovies();
  const [ratedMovies, setRatedMovies] = useState([]);
  const [ratedPage, setRatedPage] = useState(1);
  const [totalRatedResults, setTotalRatedResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);

  const fetchRatedMovies = async (page = 1) => {
    setIsLoading(true);
    setError(null);
    setWarning(null);

    const savedRatings = JSON.parse(localStorage.getItem('rated_movies')) || {};
    if (Object.keys(savedRatings).length === 0) {
      setWarning('Нет оценённых фильмов');
      setIsLoading(false);
      return;
    }

    const guestSessionId = await getValidGuestSession();
    if (!guestSessionId) {
      setError('Гостевая сессия недоступна');
      setIsLoading(false);
      return;
    }

    try {
      const url = `${baseUrl}/guest_session/${guestSessionId}/rated/movies?api_key=${apiKey}&page=${page}`;
      const { data } = await axios.get(url);

      if (data.results.length > 0) {
        setRatedMovies(data.results);
        setTotalRatedResults(data.total_results);
      } else {
        setWarning('Нет оценённых фильмов');
        setRatedMovies([]);
        setTotalRatedResults(0);
      }
    } catch {
      setError('Ошибка загрузки оценённых фильмов.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRatedMovies(ratedPage);
  }, [ratedPage]);

  return {
    ratedMovies,
    ratedPage,
    setRatedPage,
    totalRatedResults,
    isLoading: isLoading || genresLoading,
    error: error || genresError,
    warning,
    fetchRatedMovies,
    genres,
  };
};
