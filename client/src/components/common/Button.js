import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

/**
 * Button Component
 * @param {Object} props 
 *  @param {String} text - Button caption
 *  @param {function} onClick - Action on click
 */
const Button = ({ text, onClick }) => {
  return (
    <button className='button' onClick={onClick}>{text || ''}</button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
