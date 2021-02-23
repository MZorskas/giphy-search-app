import React, { useState, useCallback, useEffect } from 'react';
import './PageLayout.scss';
import Header from 'features/Header';
import GalleryContainer from 'features/GalleryContainer';
import giphy from 'apis/giphy';
import { ReactComponent as Loader } from 'assets/ellipsis_loader.svg';
import ErrorMessage from 'components/ErrorMessage';

const PageLayout = () => {
  const [hasData, setHasData] = useState(false);
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetchData = useCallback(async (value, offset = '0') => {
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
      setIsLoading(false);
      setHasData(true);
      setData((previousData) => previousData.concat(response.data.data));
      setTotalCount(response.data.pagination.total_count);
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
  }, []);

  useEffect(() => {
    setData([]);
    setHasData(false);
  }, [searchValue]);

  return (
    <main className="page-layout" data-testid="page-layout">
      <div className="page-layout__content-wrapper">
        <Header fetchData={fetchData} />
        {hasData && (
          <GalleryContainer
            title={searchValue}
            totalCount={totalCount}
            data={data}
            fetchData={fetchData}
            error={error}
            isLoading={isLoading}
          />
        )}
        {error && !isLoading && <ErrorMessage message={error} />}
        {isLoading && <Loader className="page-layout__loader" />}
      </div>
    </main>
  );
};

export default PageLayout;
