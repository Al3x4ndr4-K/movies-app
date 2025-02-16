import { useContext, useEffect } from 'react';

import SearchMovies from '../../SearchMovies/SearchMovies.jsx';
import MovieList from '../../MovieList/MovieList.jsx';
import PaginationComponent from '../../Pagination/Pagination.jsx';
import { MoviesContext } from '../../../context/MoviesContext.jsx';
import LoadingSpinner from '../../Spinner/LoadingSpinner.jsx';
import ShowErrorNotification from '../../../notifications/ShowErrorNotification.jsx';

const SearchTab = () => {
  const { movies, totalResults, query, setQuery, page, setPage, genres, isLoading, error } = useContext(MoviesContext);
  const handleSearch = (results, totalResults, searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
  };

  useEffect(() => {
    if (error) {
      ShowErrorNotification(error);
    }
  }, [error]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <SearchMovies onSearch={handleSearch} query={query} />
      <MovieList movies={movies} genres={genres} />
      <PaginationComponent currentPage={page} totalResults={totalResults} pageSize={20} onPageChange={setPage} />
    </>
  );
};

export default SearchTab;
