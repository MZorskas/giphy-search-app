import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './IconButton.scss';

const IconButton = React.forwardRef(
  ({ icon, onClick, className, type, form, ariaLabel }, ref) => {
    return (
      <button
        className={classNames('icon-button', className)}
        onClick={onClick}
        ref={ref}
        type={type}
        form={form}
        aria-label={ariaLabel}
      >
        {icon}
      </button>
    );
  }
);

IconButton.propTypes = {
  icon: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  form: PropTypes.string,
  ariaLabel: PropTypes.string,
};

IconButton.defaultProps = {
  type: 'button',
  ariaLabel: 'search',
};
export default IconButton;
