import { Offline } from 'react-detect-offline';
import { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';

import { useFetchMovies } from '../../hooks/useFetchMovies.jsx';
import ErrorAlert from '../../utils/ErrorAlert.jsx';
import LoadingSpinner from '../../utils/LoadingSpinner.jsx';
import MovieList from '../MovieList/MovieList.jsx';
import SearchMovies from '../SearchMovies/SearchMovies.jsx';
import PaginationComponent from '../Pagination/Pagination.jsx';
import { apiKey, baseUrl, fetchAllMovies, getValidGuestSession, searchData } from '../../api/apiConfig.jsx';

const Layout = () => {
  const { data: allMovies, genres, isLoading, error } = useFetchMovies();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [query, setQuery] = useState('');
  const [ratedMovies, setRatedMovies] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isRatedLoading, setIsRatedLoading] = useState(false);
  const [ratedPage, setRatedPage] = useState(1);
  const [totalRatedResults, setTotalRatedResults] = useState(0);

  const pageSize = 20;

  useEffect(() => {
    const initializeGuestSession = async () => {
      try {
        const guestSessionId = await getValidGuestSession();
        if (!guestSessionId) {
          console.error('Не удалось инициализировать гостевую сессию');
        } else {
          console.log('Гостевая сессия успешно создана:', guestSessionId);
        }
      } catch (error) {
        console.error('Ошибка при создании гостевой сессии:', error);
      }
    };

    initializeGuestSession();
  }, []);

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

  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem('rated_movies')) || {};
    if (Object.keys(savedRatings).length > 0) {
      fetchRatedMovies();
    } else {
      console.log('Нет оценённых фильмов в localStorage');
      setIsRatedLoading(false);
    }
  }, []);

  const fetchRatedMovies = async (page = 1) => {
    setIsRatedLoading(true);

    const savedRatings = JSON.parse(localStorage.getItem('rated_movies')) || {};
    if (Object.keys(savedRatings).length === 0) {
      console.log('Нет оценённых фильмов в localStorage');
      setIsRatedLoading(false);
      return;
    }

    const guestSessionId = await getValidGuestSession();
    if (!guestSessionId) {
      console.error('Гостевая сессия недоступна');
      setIsRatedLoading(false);
      return;
    }

    try {
      const url = `${baseUrl}/guest_session/${guestSessionId}/rated/movies?api_key=${apiKey}&page=${page}`;
      const { data } = await axios.get(url);

      if (data.results && data.results.length > 0) {
        console.log('Оценённые фильмы:', data.results);
        setRatedMovies(data.results);
        setTotalRatedResults(data.total_results);
      } else {
        console.log('Нет оценённых фильмов');
        setRatedMovies([]);
        setTotalRatedResults(0);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        console.log('Нет оценённых фильмов (404)');
        setRatedMovies([]);
        setTotalRatedResults(0);
      } else {
        console.error('Ошибка при загрузке оценённых фильмов:', error.response ? error.response.data : error.message);
      }
    } finally {
      setIsRatedLoading(false);
    }
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
      <Offline>
        <ErrorAlert message="Что-то интернета нет... Проверьте соединение!" />
      </Offline>
      <Tabs
        defaultActiveKey="search"
        onChange={(key) => {
          if (key === 'rated') {
            fetchRatedMovies(ratedPage);
          }
        }}
        items={[
          {
            key: 'search',
            label: 'Search',
            children: (
              <>
                <SearchMovies onSearch={handleSearch} query={query} />
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
              <>
                <LoadingSpinner isLoading={isRatedLoading} />
                <ErrorAlert message={error} />
                <MovieList
                  movies={ratedMovies}
                  genres={genres}
                  showRatedOnly={true}
                  onUpdateRatedMovies={fetchRatedMovies}
                />
                <PaginationComponent
                  currentPage={ratedPage}
                  totalResults={totalRatedResults}
                  pageSize={20}
                  onPageChange={(newPage) => {
                    setRatedPage(newPage);
                    fetchRatedMovies(newPage);
                  }}
                />
              </>
            ),
          },
        ]}
      />
    </section>
  );
};

export default Layout;
