import { Offline } from 'react-detect-offline';

import { useFetchMovies } from '../../hooks/useFetchMovies.jsx';
import ErrorAlert from '../../utils/ErrorAlert.jsx';
import LoadingSpinner from '../../utils/LoadingSpinner.jsx';
import MovieList from '../MovieList/MovieList.jsx';
import SearchMovies from '../SearchMovies/SearchMovies.jsx';

const Layout = () => {
  const { data, genres, isLoading, error } = useFetchMovies();

  return (
    <section style={{ margin: '0 auto', maxWidth: '1000px' }}>
      <Offline>
        <ErrorAlert message="Что-то интернета нет... Проверьте соединение!" />
      </Offline>

      <ErrorAlert message={error} />
      <LoadingSpinner isLoading={isLoading} />
      <SearchMovies></SearchMovies>
      <MovieList movies={data} genres={genres} />
    </section>
  );
};

export default Layout;
