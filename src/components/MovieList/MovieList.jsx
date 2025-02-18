import { Col, Empty, Row } from 'antd';
import { useContext } from 'react';

import MovieCard from '../MovieCard/MovieCard.jsx';
import { RatedMoviesContext } from '../../context/RatedMoviesContext.jsx';

const MovieList = ({ movies, genres }) => {
  const { fetchRatedMovies } = useContext(RatedMoviesContext);

  if (!movies || movies.length === 0) {
    return <Empty description="No results found" />;
  }

  const displayedMovies = movies.length >= 20 ? movies.slice(0, 20) : movies;

  return (
    <Row gutter={[36, 37]} justify="center">
      {displayedMovies?.map((item) => (
        <Col key={item?.id} xs={24} sm={12}>
          <MovieCard item={item} genres={genres} onUpdateRatedMovies={fetchRatedMovies} />
        </Col>
      ))}
    </Row>
  );
};

export default MovieList;

//
