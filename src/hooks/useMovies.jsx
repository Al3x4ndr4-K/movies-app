import { useEffect, useState } from 'react';

import { fetchAllMovies, searchData } from '../api/apiConfig.jsx';

import { useFetchMovies } from './useFetchMovies.jsx';

export const useMovies = () => {
  const { genres = [], isLoading: genresLoading, error: genresError } = useFetchMovies();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let movieData;

        if (query) {
          movieData = await searchData(query, page);
        } else {
          movieData = await fetchAllMovies(page);
        }

        console.log('Fetched movies:', movieData); // Проверяем, что получаем

        setMovies(Array.isArray(movieData.results) ? movieData.results : []);
        setTotalResults(movieData.totalResults || 0);
      } catch (err) {
        setError('Ошибка загрузки фильмов. Попробуйте позже.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query, page]);

  return {
    movies,
    totalResults,
    query,
    setQuery,
    page,
    setPage,
    genres,
    isLoading: isLoading || genresLoading,
    error: error || genresError,
  };
};
