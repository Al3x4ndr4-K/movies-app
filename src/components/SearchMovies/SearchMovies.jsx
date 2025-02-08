import { Input } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';

import { searchData } from '../../api/apiConfig.jsx';
import LoadingSpinner from '../../utils/LoadingSpinner.jsx';

const SearchMovies = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (!query.trim()) {
        onSearch(null);
        return;
      }

      try {
        setIsLoading(true);
        const res = await searchData(query);
        onSearch(res?.results || []);
      } catch (err) {
        console.error('API Error:', err.response ? err.response.data : err.message);
        onSearch([]);
      } finally {
        setIsLoading(false);
      }
    }, 700),
    []
  );

  useEffect(() => {
    debouncedSearch(searchValue);

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchValue, debouncedSearch]);

  return (
    <div>
      <Input
        placeholder="Type to search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{ width: '100%', marginBottom: '20px' }}
      />
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default SearchMovies;
