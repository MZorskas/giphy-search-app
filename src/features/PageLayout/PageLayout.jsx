import React, { useState, useCallback, useEffect } from 'react';
import './PageLayout.scss';
import Header from 'features/Header';
import GalleryContainer from 'features/GalleryContainer';
import giphy from 'apis/giphy';

const PageLayout = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetchData = useCallback(
    async (value, offset = '0') => {
      setIsLoading(true);
      setError('');
      setSearchValue(value);
      try {
        const response = await giphy.get('/search', {
          params: {
            q: value,
            offset: offset,
          },
        });
        console.log(response);
        setIsLoading(false);
        setData((previousData) => previousData.concat(response.data.data));
        setTotalCount(response.data.pagination.total_count);
      } catch (e) {
        setIsLoading(false);
        setError(e.message);
      }
    },
    [setData, setIsLoading, setError]
  );

  useEffect(() => {
    setData([]);
  }, [searchValue]);

  return (
    <main className="page-layout">
      <div className="page-layout__content-wrapper">
        <Header fetchData={fetchData} />
        <GalleryContainer
          title={searchValue}
          totalCount={totalCount}
          data={data}
          fetchData={fetchData}
          error={error}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
};

export default PageLayout;
