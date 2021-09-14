import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getItemFromServer, getProcessedItem } from '../../services/apiItem';
import Breadcrumb from '../common/Breadcrumb';
import Button from '../common/Button';
import Loading from '../common/Loading';
import './DetailPage.scss';

/**
 * Detail page component
 */
const DetailPage = () => {
  const history = useHistory();
  const navigationLinks = history.location.pathname.split('/');
  const idPage = navigationLinks[navigationLinks.length - 1];
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [breadcrumbList, setBreadcrumbList] = useState([]);

  /**
   * Load the item details from the server.
   */
  useEffect(async () => {
    if (idPage || idPage !== '') {
      const data = await getItemFromServer(idPage);
      const item = getProcessedItem(data.item);
      setItem(item);
      setBreadcrumbList(data.item.category_path);
      setLoading(false);
    } else {
      history.push('/');
    }
  }, [idPage]);

  if (loading) return <Loading />;

  return (
    <>
      <Breadcrumb list={breadcrumbList} />
      <div className='detail'>
        <div className='detail__left-panel'>
          <img src={item.picture} alt={item.title} className='detail__image' />
          <h1 className='detail__description-title'>Descripción del producto</h1>
          <p className='detail__description'>{item.description}</p>
        </div>
        <div className='detail__right-panel'>
          <p className='detail__condition'>{item.condition === 'new' ? 'Nuevo' : item.condition.toUpperCase()} - {item.soldQuantity + ' ' + (item.soldQuantity === 1 ? 'vendido' : 'vendidos')}</p>
          <p className='detail__title'>{item.title}</p>
          <p className='detail__amount'>
            <span className='item__currency'>{item.price.currency}</span>
            {item.price.getPrice()}
          </p>
          <Button text='Comprar' />
        </div>
      </div>
    </>
  );
};

export default DetailPage;
