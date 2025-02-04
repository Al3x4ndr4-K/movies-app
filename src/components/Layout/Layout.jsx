import { useEffect, useState } from 'react';
import { Col, Row } from 'antd';

import { fetchTrending } from '../../api/apiConfig.jsx';
import MovieCard from '../MovieCard/MovieCard.jsx';

const Layout = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTrending('day')
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err, 'err');
      });
  }, []);

  console.log(data, 'data');

  return (
    <section style={{ margin: '0 auto', maxWidth: '1000px' }}>
      <Row gutter={[36, 37]} justify="center">
        {data?.map((item) => (
          <Col key={item?.id} xs={24} sm={12}>
            <MovieCard item={item} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default Layout;
