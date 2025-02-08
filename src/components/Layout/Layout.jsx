import { Offline } from 'react-detect-offline';
import { useState } from 'react';

import { useFetchMovies } from '../../hooks/useFetchMovies.jsx';
import ErrorAlert from '../../utils/ErrorAlert.jsx';
import LoadingSpinner from '../../utils/LoadingSpinner.jsx';
import MovieList from '../MovieList/MovieList.jsx';
import SearchMovies from '../SearchMovies/SearchMovies.jsx';

const Layout = () => {
  const { data: trendingMovies, genres, isLoading, error } = useFetchMovies();
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <section style={{ margin: '0 auto', maxWidth: '1000px' }}>
      <Offline>
        <ErrorAlert message="Что-то интернета нет... Проверьте соединение!" />
      </Offline>

      <ErrorAlert message={error} />
      <LoadingSpinner isLoading={isLoading} />
      <SearchMovies onSearch={handleSearch} />
      <MovieList movies={searchResults || trendingMovies} genres={genres} />
    </section>
  );
};

export default Layout;
