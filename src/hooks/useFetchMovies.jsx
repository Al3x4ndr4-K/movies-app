import { useEffect, useState } from 'react';

import { fetchAllMovies, fetchGenres } from '../api/apiConfig.jsx';

export const useFetchMovies = () => {
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    Promise.all([fetchAllMovies(1), fetchGenres()])
      .then(([movies, genreList]) => {
        setData(movies.results);
        setGenres(genreList);
      })
      .catch(() => {
        setError('Ошибка при загрузке данных.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { data, genres, isLoading, error };
};
