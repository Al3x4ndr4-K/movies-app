import { truncateText } from '../../utils/truncateText.jsx';

const MovieOverview = ({ overview }) => {
  const shortOverview = truncateText(overview || '', 200);

  return <p style={{ marginTop: '8px', fontSize: '12px' }}>{shortOverview || 'Описание отсутствует'}</p>;
};

export default MovieOverview;
