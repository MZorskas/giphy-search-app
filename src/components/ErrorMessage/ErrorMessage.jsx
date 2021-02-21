import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './ErrorMessage.scss';

const ErrorMessage = ({ message, className }) => {
  return (
    <p
      data-testid="error-message"
      className={classNames('error-message', className)}
    >
      {message}
    </p>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ErrorMessage;
