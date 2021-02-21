import React, { useState, useRef, memo } from 'react';
import './ImageCard.scss';
import ImageModal from './ImageModal';
import PropTypes from 'prop-types';

const ImageCard = memo(({ images, alt, elementRef }) => {
  const [isOpen, setIsOpen] = useState(false);

  const imageCardRef = useRef(null);

  const closeModal = () => {
    document.body.removeAttribute('style');
    setIsOpen(false);
    imageCardRef.current.focus();
  };

  const handleMouseDown = (event) => event.preventDefault();

  const handleClick = () => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
      setIsOpen(true);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') setIsOpen(true);
  };

  return (
    <div
      className="image-card"
      tabIndex="0"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      ref={imageCardRef}
      data-testid="image-card"
      onMouseDown={handleMouseDown}
    >
      <picture>
        <source
          media="(max-width: 768px)"
          srcSet={images?.downsized.url}
          data-testid="image-card-source-1"
        />
        <source
          media="(min-width: 769px)"
          srcSet={images?.downsized_large.url}
          data-testid="image-card-source-2"
        />
        <img
          src={images?.downsized_large.url}
          alt={alt}
          ref={elementRef}
          className="image-card__image"
        />
      </picture>

      {isOpen && (
        <ImageModal
          imageUrl={images?.original.url}
          alt={alt}
          closeModal={closeModal}
        />
      )}
    </div>
  );
});

ImageCard.propTypes = {
  alt: PropTypes.string,
  images: PropTypes.object.isRequired,
  elementRef: PropTypes.func,
};

export default ImageCard;
