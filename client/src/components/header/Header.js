import React from 'react';
import './Header.scss';
import logo from '../../assets/logo_ml.png';
import { Link } from 'react-router-dom';
import Search from '../search/Search';

/**
 * Header component
 */
const Header = () => {
  return (
    <header className='header'>
      <div className='header__container'>
        <Link to='/'>
          <img className='header__image' src={logo} alt='Mercado libre' />
        </Link>
        <Search />
      </div>
    </header>
  );
};

export default Header;
