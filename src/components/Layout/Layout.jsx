import { notification, Tabs } from 'antd';
import { useContext, useEffect } from 'react';

import LoadingSpinner from '../Spinner/LoadingSpinner.jsx';
import { useMovies } from '../../hooks/useMovies.jsx';
import SearchTab from '../Tabs/SearchTab/SearchTab.jsx';
import RatedTab from '../Tabs/RatedTab/RatedTab.jsx';
import { RatedMoviesContext } from '../../context/RatedMoviesContext.jsx';

const Layout = () => {
  const { isLoading } = useMovies();
  const { ratedPage, fetchRatedMovies } = useContext(RatedMoviesContext);

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
            children: <SearchTab />,
          },
          {
            key: 'rated',
            label: 'Rated',
            children: <RatedTab />,
          },
        ]}
      />
    </section>
  );
};

export default Layout;
