import { createContext, useEffect, useState } from 'react';

import { getValidGuestSession, sendRating } from '../api/apiConfig.jsx';
import ShowErrorNotification from '../notifications/ShowErrorNotification.jsx';

export const RatedMoviesContext = createContext();

export const RatedMoviesProvider = ({ children }) => {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [ratedPage, setRatedPage] = useState(1);
  const [totalRatedResults, setTotalRatedResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState({});

  const fetchGenres = async () => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`);
      const data = await res.json();
      const genresMap = data.genres.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
      }, {});
      setGenres(genresMap);
    } catch (err) {
      ShowErrorNotification('Ошибка загрузки жанров');
    }
  };

  const fetchRatedMovies = async () => {
    setIsLoading(true);
    try {
      const sessionId = await getValidGuestSession();
      if (!sessionId) {
        ShowErrorNotification('Ошибка получения гостевой сессии');
        return;
      }

      const res = await fetch(
        `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=${import.meta.env.VITE_API_KEY}&page=${ratedPage}`
      );

      if (res.status === 404) {
        setRatedMovies([]);
        setTotalRatedResults(0);
        ShowErrorNotification('Нет оценённых фильмов');
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      setRatedMovies(data.results || []);
      setTotalRatedResults(data.total_results || 0);
    } catch (err) {
      ShowErrorNotification('Ошибка загрузки оценённых фильмов');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
    fetchRatedMovies();
  }, [ratedPage]);

  const rateMovie = async (movieId, rating) => {
    const sessionId = await getValidGuestSession();
    if (!sessionId) {
      ShowErrorNotification('Ошибка гостевой сессии');
      return;
    }

    try {
      setRatedMovies((prevMovies) =>
        prevMovies.map((movie) => (movie.id === movieId ? { ...movie, rating: rating } : movie))
      );

      await sendRating(movieId, rating, sessionId);
    } catch (err) {
      ShowErrorNotification('Ошибка при выставлении рейтинга');
    }
  };

  useEffect(() => {
    console.log('Rated movies updated:', ratedMovies);
  }, [ratedMovies]);

  return (
    <RatedMoviesContext.Provider
      value={{
        ratedMovies,
        ratedPage,
        totalRatedResults,
        setRatedPage,
        isLoading,
        error,
        fetchRatedMovies,
        rateMovie,
        genres,
      }}
    >
      {children}
    </RatedMoviesContext.Provider>
  );
};
