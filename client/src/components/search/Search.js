import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Search.scss';
import searchIcon from '../../assets/ic_search.png';

/**
 * Search component
 */
const Search = () => {
  const [searchText, setSearchText] = useState('');
  const history = useHistory();

  /**
   * Trigered when the text in the input changes.
   * @param {Event} evt - Change event
   */
  const onChangeInput = (evt) => {
    setSearchText(evt.target.value);
  };

  /**
   * Trigered when the user search a value
   * @param {Event} evt - submit event
   */
  const onSearch = async (evt) => {
    evt.preventDefault();
    history.push(`/items?search=${searchText}`);
    setSearchText('');
  };

  return (
    <form className='search' onSubmit={onSearch}>
      <input type='text' className='search__input' placeholder='Nunca dejes de buscar' value={searchText} onChange={onChangeInput} />
      <button className='search__button'>
        <img src={searchIcon} className='search__icon' alt='Buscar' />
      </button>
    </form>
  );
};

export default Search;
