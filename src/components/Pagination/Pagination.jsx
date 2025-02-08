import { Pagination } from 'antd';

const PaginationComponent = ({ currentPage, totalResults, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalResults / pageSize);

  return (
    <Pagination
      current={currentPage}
      total={totalResults}
      pageSize={20}
      onChange={onPageChange}
      showSizeChanger={false}
      showTotal={(total) => `Total ${total} items`}
      hideOnSinglePage={totalPages <= 1}
    />
  );
};

export default PaginationComponent;
