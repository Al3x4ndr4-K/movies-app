import SearchMovies from '../../SearchMovies/SearchMovies.jsx';
import ErrorAlert from '../../../utils/ErrorAlert.jsx';
import MovieList from '../../MovieList/MovieList.jsx';
import PaginationComponent from '../../Pagination/Pagination.jsx';

const SearchTab = ({ movies, totalResults, query, setQuery, page, setPage, genres, error }) => {
  const handleSearch = (results, totalResults, searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
  };

  return (
    <>
      <SearchMovies onSearch={handleSearch} query={query} />
      {error && <ErrorAlert message={error} />}
      <MovieList movies={movies} genres={genres} />
      <PaginationComponent currentPage={page} totalResults={totalResults} pageSize={20} onPageChange={setPage} />
    </>
  );
};

export default SearchTab;
