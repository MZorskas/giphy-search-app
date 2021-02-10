import React from 'react';
// import classNames from 'classnames';
import PropTypes from 'prop-types';
import './ErrorMessage.scss';

const ErrorMessage = ({ message }) => {
  return <p className="error-message">{message}</p>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
