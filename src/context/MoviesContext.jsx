import { createContext, useEffect, useState } from 'react';

import { fetchAllMovies, fetchGenres, searchData } from '../api/apiConfig.jsx';
import ShowErrorNotification from '../notifications/ShowErrorNotification.jsx';

export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGenres = async () => {
      const genresData = await fetchGenres();
      setGenres(genresData);
    };

    loadGenres();
  }, []);

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      try {
        const { results, totalResults } = query ? await searchData(query, page) : await fetchAllMovies(page);
        setMovies(results);
        setTotalResults(totalResults);
      } catch (err) {
        ShowErrorNotification('Ошибка загрузки фильмов');
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, [query, page]);

  return (
    <MoviesContext.Provider
      value={{
        movies,
        totalResults,
        query,
        setQuery,
        page,
        setPage,
        genres,
        isLoading,
        error,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
