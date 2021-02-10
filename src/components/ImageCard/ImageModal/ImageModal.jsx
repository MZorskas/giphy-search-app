import React, { useEffect, useState, useRef } from 'react';
import './ImageModal.scss';
import ReactDOM from 'react-dom';
import { CloseIcon } from 'assets/icons';
import IconButton from 'components/IconButton';
import PropTypes from 'prop-types';

const focusableNodes = ['button', 'a', 'input', 'select', 'textarea'];

const ImageModal = ({ imageUrl, closeModal, alt }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  const [lastFocusableNode, setLastFocusableNode] = useState();

  const onClickAway = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target))
      closeModal();
  };

  const onKeyDown = (e) => {
    // ESC button
    if (e.keyCode === 27) closeModal();
    // TAB + SHIFT / TAB buttons
    if (e.keyCode === 9 && e.shiftKey && e.target === lastFocusableNode[0]) {
      e.preventDefault();
      lastFocusableNode[lastFocusableNode.length - 1].focus();
    } else if (
      e.keyCode === 9 &&
      !e.shiftKey &&
      e.target === lastFocusableNode[lastFocusableNode.length - 1]
    ) {
      e.preventDefault();
      lastFocusableNode[0].focus();
    }
  };

  useEffect(() => {
    closeButtonRef.current.focus();
    if (modalRef)
      setLastFocusableNode(
        Array.from(modalRef.current.childNodes).filter((node) =>
          focusableNodes.includes(node.localName)
        )
      );
  }, [closeButtonRef, modalRef, setLastFocusableNode]);

  return ReactDOM.createPortal(
    <aside className="image-modal" onClick={onClickAway} onKeyDown={onKeyDown}>
      <div className="image-modal__content" ref={modalRef}>
        <IconButton
          className="image-modal__button"
          icon={<CloseIcon />}
          onClick={closeModal}
          ref={closeButtonRef}
        />
        <img src={imageUrl} alt={alt} className="image-modal__image" />
      </div>
    </aside>,
    document.getElementById('modal-root')
  );
};

ImageModal.propTypes = {
  alt: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ImageModal;
