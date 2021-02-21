import React from 'react';
import './Input.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Input = ({
  className,
  onChange,
  placeholder,
  validationError,
  id,
  label,
  autoFocus,
}) => {
  return (
    <React.Fragment>
      <div className="input-wrapper" data-testid="input">
        {label && (
          <label className="input-wrapper__label" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          className={classNames(
            'input-wrapper__input',
            {
              'input-wrapper__input--error': validationError,
            },
            className
          )}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
      </div>
    </React.Fragment>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeHolder: PropTypes.string,
  validationError: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  autoFocus: PropTypes.bool,
};

Input.defaultProps = {
  placeholder: 'Gifs',
};

export default Input;
