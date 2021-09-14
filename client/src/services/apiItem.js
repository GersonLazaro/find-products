import { ItemModel } from '../models/item';
import { handleResponse, handleError } from './apiUtils';
const baseUrl = process.env.API_URL + '/api/items';

/**
 * Get from the server a list of items that match with searchText
 * @param {String} searchText - text to search 
 * @returns A promise with the list of items
 */
export const getItemsFromServer = (searchText) => {
  return fetch(`${baseUrl}?q=${searchText}`)
    .then(handleResponse)
    .catch(handleError);
};

/**
 * Get a item
 * @param {String} itemId - Id to get 
 * @returns Promise with an item
 */
export const getItemFromServer = (itemId) => {
  return fetch(`${baseUrl}/${itemId}`)
    .then(handleResponse)
    .catch(handleError);
};

/**
 * Process a raw list of Items, transformed into a list of Items objects
 * @param {Array} data - Items in raw data
 * @returns a List of Items Objects
 */
export const getProcessedItems = (data) => {
  const items = [];
  data.forEach((item) => {
    items.push(new ItemModel(item.id, item.title, item.price, item.picture, item.condition, item.state, item.free_shipping));
  });
  return items;
};

/**
 * Transform a raw item into a item Object
 * @param {JSON} item - Raw item
 * @returns an Item object
 */
export const getProcessedItem = (item) => {
  return new ItemModel(item.id, item.title, item.price, item.picture, item.condition, item.state, item.free_shipping, item.sold_quantity, item.description);
};
