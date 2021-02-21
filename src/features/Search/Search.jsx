import React, { useState, useEffect } from 'react';
import './Search.scss';
import { inputRegex } from 'utils/regex';
import IconButton from 'components/IconButton';
import Input from 'components/Input';
import ErrorMessage from 'components/ErrorMessage';
import { SearchIcon } from 'assets/icons';
import PropTypes from 'prop-types';

const Search = ({ fetchData }) => {
  const [inputValue, setInputValue] = useState();
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    setValidationError('');
  }, [inputValue]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!inputValue) return setValidationError('Input should not be empty');
    if (!inputRegex.test(inputValue))
      return setValidationError('Should only contain letters and numbers');
    if (inputValue && inputRegex.test(inputValue)) fetchData(inputValue);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <section className="search" data-testid="search">
      <form
        className="search__form"
        aria-label="search"
        onSubmit={handleSubmit}
        data-testId="search-form"
      >
        <Input
          className="search__input"
          onChange={handleChange}
          placeholder="Gifs"
          validationError={!!validationError}
          id="search-input"
          label="Search"
          autoFocus
        />
        <IconButton
          className="search__button"
          icon={<SearchIcon className="search__icon" />}
          type="submit"
        />
      </form>
      {validationError && (
        <ErrorMessage
          className="search__error-message"
          message={validationError}
        />
      )}
    </section>
  );
};

Search.propTypes = {
  fetchData: PropTypes.func.isRequired,
};

export default Search;
