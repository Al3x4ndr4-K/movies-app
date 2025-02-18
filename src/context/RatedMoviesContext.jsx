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
        setIsLoading(false);
        return;
      }

      const res = await fetch(
        `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=${import.meta.env.VITE_API_KEY}&page=${ratedPage}`
      );

      if (res.status === 401) {
        ShowErrorNotification('Сессия недействительна, создаём новую...');
        localStorage.removeItem('guestSessionId');
        localStorage.removeItem('sessionExpiresAt');

        const newSessionId = await getValidGuestSession();

        if (newSessionId) {
          fetchRatedMovies();
        }
        setIsLoading(false);
        return;
      }

      if (res.status === 404) {
        setRatedMovies([]);
        setTotalRatedResults(0);
        setIsLoading(false);
        return;
      }

      const data = await res.json().catch(() => ({}));
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

    const sessionId = localStorage.getItem('guestSessionId');
    if (sessionId) {
      fetchRatedMovies();
    }
  }, [ratedPage]);

  const rateMovie = async (movieId, rating) => {
    const sessionId = await getValidGuestSession();
    if (!sessionId) {
      ShowErrorNotification('Ошибка гостевой сессии');
      return;
    }

    try {
      setRatedMovies((prevMovies) => {
        const isMovieRated = prevMovies.some((movie) => movie.id === movieId);
        if (isMovieRated) {
          return prevMovies.map((movie) => (movie.id === movieId ? { ...movie, rating } : movie));
        } else {
          return [{ id: movieId, rating }, ...prevMovies];
        }
      });

      await sendRating(movieId, rating, sessionId);

      setTimeout(() => {
        if (!ratedMovies.some((movie) => movie.id === movieId)) {
          fetchRatedMovies();
        }
      }, 1500);
    } catch (err) {
      ShowErrorNotification('Ошибка при выставлении рейтинга');
    }
  };

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
