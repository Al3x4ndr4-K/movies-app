import LoadingSpinner from '../../../utils/LoadingSpinner.jsx';
import ErrorAlert from '../../../utils/ErrorAlert.jsx';
import WarningAlert from '../../../utils/WarningAlert.jsx';
import MovieList from '../../MovieList/MovieList.jsx';
import PaginationComponent from '../../Pagination/Pagination.jsx';

const RatedTab = ({
  ratedMovies,
  totalRatedResults,
  ratedPage,
  setRatedPage,
  isLoading,
  error,
  warning,
  fetchRatedMovies,
  genres,
}) => {
  return (
    <>
      <LoadingSpinner isLoading={isLoading} />
      {error && <ErrorAlert message={error} />}
      {warning && <WarningAlert message={warning} />}
      <MovieList movies={ratedMovies} genres={genres} showRatedOnly={true} onUpdateRatedMovies={fetchRatedMovies} />
      <PaginationComponent
        currentPage={ratedPage}
        totalResults={totalRatedResults}
        pageSize={20}
        onPageChange={setRatedPage}
      />
    </>
  );
};

export default RatedTab;
