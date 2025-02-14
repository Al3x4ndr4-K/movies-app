import { Offline } from 'react-detect-offline';
import { useEffect, useState } from 'react';
import { Tabs } from 'antd';

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
  const [ratedMovies, setRatedMovies] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(false);

  const pageSize = 20;

  useEffect(() => {
    const fetchMovies = async () => {
      setIsPageLoading(true);

      try {
        if (query) {
          const { results, totalResults } = await searchData(query, page);
          setMovies(results);
          setTotalResults(totalResults);
        } else {
          const { results, totalResults } = await fetchAllMovies(page);
          setMovies(results);
          setTotalResults(totalResults);
        }
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
      } finally {
        setIsPageLoading(false);
      }
    };

    fetchMovies();
  }, [query, page]);

  const fetchRatedMovies = () => {
    const savedRatings = JSON.parse(localStorage.getItem('rated_movies')) || {};
    const ratedMovieIds = Object.keys(savedRatings).map(Number); // Преобразуем ключи в числа
    console.log('Обновлён список оценённых фильмов:', ratedMovieIds);

    setRatedMovies(ratedMovieIds);
  };

  useEffect(() => {
    fetchRatedMovies();
  }, []);

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
      <LoadingSpinner isLoading={isLoading || isPageLoading} />
      <Tabs
        defaultActiveKey="search"
        items={[
          {
            key: 'search',
            label: 'Search',
            children: (
              <>
                <SearchMovies onSearch={handleSearch} query={query} />
                <Offline>
                  <ErrorAlert message="Что-то интернета нет... Проверьте соединение!" />
                </Offline>
                <ErrorAlert message={error} />
                <MovieList movies={movies} genres={genres} />
                <PaginationComponent
                  currentPage={page}
                  totalResults={totalResults}
                  pageSize={pageSize}
                  onPageChange={onPageChange}
                />
              </>
            ),
          },
          {
            key: 'rated',
            label: 'Rated',
            children: (
              <MovieList
                movies={allMovies.filter((movie) => ratedMovies.includes(movie.id))}
                genres={genres}
                showRatedOnly={true}
                onUpdateRatedMovies={fetchRatedMovies}
              />
            ),
          },
        ]}
      />
    </section>
  );
};

export default Layout;
