import { useContext, useEffect } from 'react';

import MovieList from '../../MovieList/MovieList.jsx';
import PaginationComponent from '../../Pagination/Pagination.jsx';
import { RatedMoviesContext } from '../../../context/RatedMoviesContext.jsx';
import LoadingSpinner from '../../Spinner/LoadingSpinner.jsx';
import ShowErrorNotification from '../../../notifications/ShowErrorNotification.jsx';

const RatedTab = () => {
  const { ratedMovies, totalRatedResults, ratedPage, setRatedPage, error, genres, isLoading, fetchRatedMovies } =
    useContext(RatedMoviesContext);

  useEffect(() => {
    if (error) {
      ShowErrorNotification(error);
    }
  }, [error]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <MovieList movies={ratedMovies} genres={genres} fetchRatedMovies={fetchRatedMovies} />
      <PaginationComponent
        currentPage={ratedPage}
        totalResults={totalRatedResults}
        pageSize={20}
        onPageChange={setRatedPage}
        fetchRatedMovies={fetchRatedMovies}
      />
    </>
  );
};

export default RatedTab;
