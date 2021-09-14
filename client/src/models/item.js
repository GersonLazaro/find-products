import { PriceModel } from './price';
/**
 * Item Model
 */
export class ItemModel {
  /**
   * Constructor for item Model
   * @param {string} id - Unique ID
   * @param {String} title - Item title
   * @param {Object} price - JSON Object with information about the price
   * @param {String} picture - Picture's URL
   * @param {String} condition - Product condition: "new", "used", etc.
   * @param {String} state - Geographic state of the seller
   * @param {Bool} freeShipping - True if the item has free shipping. False in another case
   * @param {String} soldQuantity - Quantity of items solded
   * @param {String} description - Item description
   */
  constructor (id, title, price, picture, condition, state, freeShipping = false, soldQuantity = 0, description = '') {
    this.id = id;
    this.title = title;
    this.price = new PriceModel(price.currency, price.amount, price.decimals);
    this.picture = picture;
    this.condition = condition;
    this.state = state;
    this.freeShipping = freeShipping;
    this.soldQuantity = soldQuantity;
    this.description = description;
  }
}
