import { Col, Empty, Row } from 'antd';

import MovieCard from '../MovieCard/MovieCard.jsx';

const MovieList = ({ movies, genres, onUpdateRatedMovies }) => {
  if (!movies || movies.length === 0) {
    return <Empty description="No results found" />;
  }

  const displayedMovies = movies.length >= 20 ? movies.slice(0, 20) : movies;

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
