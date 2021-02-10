import React from 'react';
import './Header.scss';
import PropTypes from 'prop-types';
import Search from 'features/Search';

const Header = ({ fetchData }) => {
  return (
    <header className="header">
      <h1 className="header__title">Giphy search app</h1>
      <Search fetchData={fetchData} />
    </header>
  );
};

Header.propTypes = {
  fetchData: PropTypes.func.isRequired,
};

export default Header;
