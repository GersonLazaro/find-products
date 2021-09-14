import React from 'react';
import PropTypes from 'prop-types';
import './Breadcrumb.scss';
import arrowRightIcon from '../../assets/ic_arrow_right.svg';

/**
 * Breadcrumb Component
 * @param {Object} props
 *  @param {Array} list - List of categories
 */
const Breadcrumb = ({ list }) => {
  /**
   * Create a list of components to build the breadcrumb
   */
  const itemList = list.map((item, index) => {
    return (
      <React.Fragment key={'breadcrumb-item-' + index}>
        <p className={'breadcrumb__item ' + ((index + 1 === list.length) ? 'breadcrumb__item--selected' : '')}>{item}</p>
        {index + 1 < list.length && <img className='breadcrumb__arrow' src={arrowRightIcon} alt={item} />}
      </React.Fragment>
    );
  });

  /**
   * Render the breadcrumb
   */
  return (
    <div className='breadcrumb'>
      {itemList}
    </div>
  );
};

Breadcrumb.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string)
};

export default Breadcrumb;
