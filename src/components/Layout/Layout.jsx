import { notification, Tabs } from 'antd';
import { useEffect } from 'react';

import LoadingSpinner from '../Spinner/LoadingSpinner.jsx';
import { useMovies } from '../../hooks/useMovies.jsx';
import { useRatedMovies } from '../../hooks/useRatedMovies.jsx';
import useGuestSession from '../../hooks/useGuestSession.jsx';
import SearchTab from '../Tabs/SearchTab/SearchTab.jsx';
import RatedTab from '../Tabs/RatedTab/RatedTab.jsx';

const Layout = () => {
  const { movies, totalResults, query, setQuery, setPage, genres = [], isLoading, error } = useMovies();
  const {
    ratedMovies,
    ratedPage,
    totalRatedResults,
    setRatedPage,
    isLoading: isRatedLoading,
    error: ratedError,
    warning,
    fetchRatedMovies,
  } = useRatedMovies();
  const { error: sessionError } = useGuestSession();

  useEffect(() => {
    const handleOffline = () => {
      notification.error({
        message: 'Нет подключения к интернету',
        placement: 'topRight',
        duration: 3,
      });
    };

    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <section className="m-auto max-w-[1000px]">
      <LoadingSpinner isLoading={isLoading} />
      <Tabs
        centered={true}
        defaultActiveKey="search"
        onChange={(key) => key === 'rated' && fetchRatedMovies(ratedPage)}
        items={[
          {
            key: 'search',
            label: 'Search',
            children: (
              <SearchTab
                movies={movies}
                totalResults={totalResults}
                query={query}
                setQuery={setQuery}
                setPage={setPage}
                genres={genres}
                error={error || sessionError}
              />
            ),
          },
          {
            key: 'rated',
            label: 'Rated',
            children: (
              <RatedTab
                ratedMovies={ratedMovies}
                totalRatedResults={totalRatedResults}
                ratedPage={ratedPage}
                setRatedPage={setRatedPage}
                isLoading={isRatedLoading}
                error={ratedError}
                warning={warning}
                fetchRatedMovies={fetchRatedMovies}
                genres={genres}
              />
            ),
          },
        ]}
      />
    </section>
  );
};

export default Layout;
