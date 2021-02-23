import React, { useRef, useState, useEffect } from 'react';
import './GalleryContainer.scss';
import ImageCard from 'components/ImageCard';
import ErrorMessage from 'components/ErrorMessage';
import PropTypes from 'prop-types';
import { elementsPerPage } from 'apis/giphy';

const GalleryContainer = ({ data, title, totalCount, fetchData }) => {
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
    if (data) setHasMore(data.length < totalCount);
  }, [data, totalCount]);

  useEffect(() => {
    if (hasMore && elementsOffset !== 0) {
      // console.log('Should fetch now');
      fetchData(title, elementsOffset);
    }
  }, [elementsOffset, hasMore, fetchData, title]);

  return (
    <section className="gallery-container" data-testid="gallery-container">
      <div className="gallery-container__info-wrapper">
        <h2 className="gallery-container__title">
          {title}
          <span className="gallery-container__amount">{totalCount} GIFs</span>
        </h2>
      </div>

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

      {totalCount === 0 && (
        <ErrorMessage
          className="gallery-container__error-message"
          message={`No GIFs found for ${title}`}
        />
      )}
    </section>
  );
};

GalleryContainer.propTypes = {
  title: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
  fetchData: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default GalleryContainer;
