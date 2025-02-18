import { Pagination } from 'antd';

const PaginationComponent = ({ currentPage, totalResults, onPageChange, pageSize, fetchMovies }) => {
  const totalPages = Math.ceil(totalResults / pageSize);
  const maxPages = Math.min(totalPages, 500);

  const handlePageChange = (page) => {
    onPageChange(page);
    if (fetchMovies) {
      fetchMovies(page);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
      <Pagination
        current={currentPage}
        total={maxPages * pageSize}
        pageSize={20}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default PaginationComponent;
