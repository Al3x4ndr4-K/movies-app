import { Input, Spin } from 'antd';
import { useState } from 'react';

import { searchData } from '../../api/apiConfig.jsx';

const SearchMovies = () => {
  const [searchValue, setSearchValue] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    searchData(searchValue, activePage)
      .then((res) => {
        console.log(res, 'res');
        setData(res?.results);
        setActivePage(res?.page);
      })
      .catch((err) => {
        console.log(err, 'err');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <Input
          placeholder="Type to search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: '100%', marginBottom: '20px' }}
        />
      </form>
      {isLoading && <Spin size="large" />}
    </div>
  );
};

export default SearchMovies;
