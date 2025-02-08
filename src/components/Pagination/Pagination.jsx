import { Pagination } from 'antd';

const PaginationComponent = ({ currentPage, totalResults, onPageChange, pageSize }) => {
  const totalPages = Math.ceil(totalResults / pageSize);
  const maxPages = Math.min(totalPages, 500);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
      <Pagination
        current={currentPage}
        total={maxPages * pageSize}
        pageSize={20}
        onChange={onPageChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default PaginationComponent;
