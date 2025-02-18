import { Grid } from 'antd';

import { truncateText } from '../../utils/truncateText.jsx';

const MovieOverview = ({ overview }) => {
  const shortOverview = truncateText(overview || '', 200);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  return (
    <div
      style={{
        gridArea: 'overview',
        display: screens.lg ? 'block' : 'flex',
        margin: screens.lg ? '5px 0' : '10px 5px',
      }}
    >
      <p style={{ margin: '0 5px 0 0' }} className="text-[12px]">
        {shortOverview || 'Описание отсутствует'}
      </p>
    </div>
  );
};

export default MovieOverview;

// style={{ marginTop: '8px', fontSize: '12px' }}
