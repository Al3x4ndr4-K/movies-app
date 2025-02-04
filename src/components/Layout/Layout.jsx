import { useEffect, useState } from 'react';
import { Col, Row } from 'antd';

import { fetchGenres, fetchTrending } from '../../api/apiConfig.jsx';
import MovieCard from '../MovieCard/MovieCard.jsx';

const Layout = () => {
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState({});

  useEffect(() => {
    fetchTrending('day')
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err, 'err');
      });

    fetchGenres()
      .then((genres) => {
        setGenres(genres);
      })
      .catch((err) => {
        console.log('Ошибка при загрузке жанров:', err);
      });
  }, []);

  console.log(data, 'data');

  return (
    <section style={{ margin: '0 auto', maxWidth: '1000px' }}>
      <Row gutter={[36, 37]} justify="center">
        {data?.map((item) => (
          <Col key={item?.id} xs={24} sm={12}>
            <MovieCard item={item} genres={genres} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default Layout;
