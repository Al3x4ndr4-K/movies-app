import { Input } from 'antd';
import { useCallback, useState } from 'react';
import { debounce } from 'lodash';

import { searchData } from '../../api/apiConfig.jsx';
import LoadingSpinner from '../../utils/LoadingSpinner.jsx';

const SearchMovies = ({ onSearch, page, query }) => {
  const [searchValue, setSearchValue] = useState(query);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (value, currentPage) => {
      if (!value.trim()) {
        onSearch([], 0, '');
        return;
      }
      try {
        setIsLoading(true);
        const res = await searchData(value, currentPage);
        onSearch(res?.results || [], res?.totalResults || 0, value);
      } catch (err) {
        console.error('API Error:', err.response ? err.response.data : err.message);
        onSearch([], 0, '');
      } finally {
        setIsLoading(false);
      }
    }, 800),
    [page]
  );

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    debouncedSearch(newValue, 1);
  };

  return (
    <div>
      <Input
        placeholder="Type to search..."
        id={Math.random()}
        value={searchValue}
        onChange={handleInputChange}
        style={{ width: '100%', marginBottom: '20px' }}
      />
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default SearchMovies;
