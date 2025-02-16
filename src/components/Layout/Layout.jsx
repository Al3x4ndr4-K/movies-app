import { Offline } from 'react-detect-offline';
import { Tabs } from 'antd';

import ErrorAlert from '../../utils/ErrorAlert.jsx';
import LoadingSpinner from '../../utils/LoadingSpinner.jsx';
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

  return (
    <section style={{ margin: '0 auto', maxWidth: '1000px' }}>
      <LoadingSpinner isLoading={isLoading} />
      <Offline>
        <ErrorAlert message="Что-то интернета нет..." />
      </Offline>

      <Tabs
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
