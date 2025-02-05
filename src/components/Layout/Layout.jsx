import { useEffect, useState } from 'react';
import { Alert, Col, Row, Spin } from 'antd';
import { Offline, Online } from 'react-detect-offline';

import { fetchGenres, fetchTrending } from '../../api/apiConfig.jsx';
import MovieCard from '../MovieCard/MovieCard.jsx';

const Layout = () => {
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetchTrending('day')
      .then((res) => {
        setData(res);
      })
      .catch(() => {
        setError('Произошла ошибка при загрузке данных');
      })
      .finally(() => {
        setIsLoading(false);
      });

    fetchGenres()
      .then((genres) => {
        setGenres(genres);
      })
      .catch(() => {
        setError('Не удалось загрузить жанры.');
      });
  }, []);

  return (
    <section style={{ margin: '0 auto', maxWidth: '1000px' }}>
      <Offline>
        <Alert message="Нет подключения к интернету!" type="warning" showIcon style={{ marginBottom: '20px' }} />
      </Offline>

      <Online>
        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '20px' }} />}
        <Spin spinning={isLoading} fullscreen tip="Loading..." />
        <Row gutter={[36, 37]} justify="center">
          {data?.map((item) => (
            <Col key={item?.id} xs={24} sm={12}>
              <MovieCard item={item} genres={genres} />
            </Col>
          ))}
        </Row>
      </Online>
    </section>
  );
};

export default Layout;
