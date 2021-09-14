import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ItemResult.scss';
import shippingIcon from '../../assets/ic_shipping.png';

/**
 * Item result component
 * @param {Object} props
 *  @param {ItemModel} item - Item to display
 *  @param {boolean} separator - True if there are a separator after the item card. False in another case
 */
const ItemResult = ({ item, separator }) => {
  return (
    <>
      <Link className='item' to={'items/' + item.id}>
        <article className='item__container'>
          <img src={item.picture} alt={item.title} className='item__image' />
          <div className='item__information'>
            <div className='item__basic-information'>
              <div className='item__price'>
                <p className='item__amount'>
                  <span className='item__currency'>{item.price.currency}</span>
                  {item.price.getPrice()}
                </p>
                {item.freeShipping && <img src={shippingIcon} alt='' className='item__free-shipping-icon' />}
              </div>
              <p className='item__title'>{item.title}</p>
            </div>
            <div className='item__ubication'>
              <p className='item__state'>{item.state}</p>
            </div>
          </div>
        </article>
      </Link>
      {separator && <hr />}
    </>
  );
};

ItemResult.propTypes = {
  item: PropTypes.object,
  separator: PropTypes.bool
};

export default ItemResult;
