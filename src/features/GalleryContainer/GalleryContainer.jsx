import React, { useRef, useState, useEffect } from 'react';
import './GalleryContainer.scss';
import ImageCard from 'components/ImageCard';
import ErrorMessage from 'components/ErrorMessage';
import { ReactComponent as Loader } from 'assets/ellipsis_loader.svg';
import PropTypes from 'prop-types';
import { elementsPerPage } from 'apis/giphy';

const GalleryContainer = ({
  data,
  title,
  totalCount,
  fetchData,
  error,
  isLoading,
}) => {
  const [elementsOffset, setElementsOffset] = useState(0);
  const [element, setElement] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting)
          setElementsOffset((previousValue) => previousValue + elementsPerPage);
      },
      { threshold: 0.1 }
    )
  );

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  useEffect(() => {
    setHasMore(data.length < totalCount);
  }, [data, totalCount]);

  useEffect(() => {
    if (hasMore && elementsOffset !== 0) {
      console.log('Should fetch now');
      fetchData(title, elementsOffset);
    }
  }, [elementsOffset, hasMore, fetchData, title]);

  return (
    <section className="gallery-container">
      {title && (
        <div className="gallery-container__info-wrapper">
          <h2 className="gallery-container__title">
            {title}
            <span className="gallery-container__amount">{totalCount} GIFs</span>
          </h2>
        </div>
      )}

      {data?.length > 0 && (
        <div className="gallery-container__grid">
          {data?.map((el, index) => {
            if (data.length === index + 1) {
              return (
                <ImageCard
                  elementRef={setElement}
                  key={index}
                  images={el.images}
                  alt={el.title}
                />
              );
            } else {
              return (
                <ImageCard key={index} images={el.images} alt={el.title} />
              );
            }
          })}
        </div>
      )}

      {isLoading && <Loader className="gallery-container__loader" />}

      {error && !isLoading && <ErrorMessage message={error} />}

      {totalCount === 0 && !isLoading && !error && title && (
        <ErrorMessage message={`No GIFs found for ${title}`} />
      )}
    </section>
  );
};

GalleryContainer.propTypes = {
  title: PropTypes.string,
  totalCount: PropTypes.number.isRequired,
  fetchData: PropTypes.func.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
};

export default GalleryContainer;
