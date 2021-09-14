import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import ItemResult from './ItemResult';
import Breadcrumb from '../common/Breadcrumb';
import { getItemsFromServer, getProcessedItems } from '../../services/apiItem';
import './ResultsPage.scss';
import Loading from '../common/Loading';

/**
 * Results Page component
 */
const ResultsPage = () => {
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const searchText = query.get('search');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [breadcrumbList, setBreadcrumbList] = useState([]);

  /**
   * Load the item list from the server.
   */
  useEffect(async () => {
    if (searchText || searchText !== '') {
      const data = await getItemsFromServer(searchText);
      const itemList = getProcessedItems(data.items);
      const items = getItemsCards(itemList);
      setItems(items);
      setBreadcrumbList(data.categories);
      setLoading(false);
    } else {
      history.push('/');
    }
  }, [searchText]);

  /**
   * Get the ItemResult's list
   * @param {Array} itemList - Array of Items to build the components
   * @returns a list of <ItemResult> components
   */
  const getItemsCards = (itemList) => {
    return itemList.map((item, index) => {
      return (
        <ItemResult item={item} separator={(index + 1 < itemList.length)} key={item.id} />
      );
    });
  };

  if (loading) return <Loading />;

  return (
    <>
      <Breadcrumb list={breadcrumbList} />
      <div className='results'>
        {items}
      </div>
    </>
  );
};

export default ResultsPage;
