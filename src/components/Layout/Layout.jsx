import { Offline } from 'react-detect-offline';
import { useEffect, useState } from 'react';

import { useFetchMovies } from '../../hooks/useFetchMovies.jsx';
import ErrorAlert from '../../utils/ErrorAlert.jsx';
import LoadingSpinner from '../../utils/LoadingSpinner.jsx';
import MovieList from '../MovieList/MovieList.jsx';
import SearchMovies from '../SearchMovies/SearchMovies.jsx';
import PaginationComponent from '../Pagination/Pagination.jsx';
import { fetchAllMovies, searchData } from '../../api/apiConfig.jsx';

const Layout = () => {
  const { data: allMovies, genres, isLoading, error } = useFetchMovies();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [query, setQuery] = useState('');
  const pageSize = 20;

  useEffect(() => {
    const fetchMovies = async () => {
      if (query) {
        const { results, totalResults } = await searchData(query, page);
        setMovies(results);
        setTotalResults(totalResults);
      } else {
        const { results, totalResults } = await fetchAllMovies(page);
        setMovies(results);
        setTotalResults(totalResults);
      }
    };

    fetchMovies();
  }, [query, page]);

  const handleSearch = (results, totalResults = 0, searchQuery = '') => {
    setMovies(results);
    setTotalResults(totalResults);
    setQuery(searchQuery);
    setPage(1);
  };

  const onPageChange = (newPage) => {
    const totalPages = Math.ceil(totalResults / pageSize);
    const maxPages = Math.min(totalPages, 500);

    if (newPage < 1) newPage = 1;
    if (newPage > maxPages) newPage = maxPages;

    setPage(newPage);
  };

  return (
    <section style={{ margin: '0 auto', maxWidth: '1000px' }}>
      <Offline>
        <ErrorAlert message="Что-то интернета нет... Проверьте соединение!" />
      </Offline>
      <ErrorAlert message={error} />
      <LoadingSpinner isLoading={isLoading} />
      <SearchMovies onSearch={handleSearch} query={query} />
      <MovieList movies={movies} genres={genres} />
      <PaginationComponent
        currentPage={page}
        totalResults={totalResults}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </section>
  );
};

export default Layout;
