import { Col, Empty, Row } from 'antd';
import { useEffect, useState } from 'react';

import MovieCard from '../MovieCard/MovieCard.jsx';

const MovieList = ({ movies, genres, showRatedOnly = false, onUpdateRatedMovies }) => {
  const [ratedMovies, setRatedMovies] = useState([]);

  useEffect(() => {
    const fetchRatedMovies = () => {
      const savedRatings = JSON.parse(localStorage.getItem('rated_movies')) || {};
      const ratedMovieIds = Object.keys(savedRatings).map(Number);
      console.log('Загружены оценённые фильмы:', ratedMovieIds);
      setRatedMovies(ratedMovieIds);
    };
    fetchRatedMovies();
  }, []);

  const isMovieRated = (movieId) => {
    return ratedMovies.includes(movieId);
  };

  const filteredMovies = showRatedOnly ? movies.filter((movie) => isMovieRated(movie.id)) : movies;

  if (!filteredMovies || filteredMovies.length === 0) {
    return <Empty description="No results found" />;
  }

  const displayedMovies = filteredMovies.length >= 20 ? filteredMovies.slice(0, 20) : filteredMovies;

  return (
    <Row gutter={[36, 37]} justify="center">
      {displayedMovies?.map((item) => (
        <Col key={item?.id} xs={24} sm={12}>
          <MovieCard item={item} genres={genres} onUpdateRatedMovies={onUpdateRatedMovies} />
        </Col>
      ))}
    </Row>
  );
};

export default MovieList;
