import Utils from '../utils/utils';
import Price from './price';

/**
 * Item Model
 */
class Item {
  /**
   * Constructor for item Model
   * @param {string} id - Unique ID
   * @param {String} title - Item title
   * @param {String} currency - Price Currency
   * @param {Number} amount - Price amount
   * @param {Number} decimals - Price decimals
   * @param {String} picture - Picture's URL
   * @param {String} condition - Product condition: "new", "used", etc.
   * @param {String} state - Geographic state of the seller
   * @param {Bool} freeShipping - True if the item has free shipping. False in another case
   * @param {String} soldQuantity - Quantity of items solded
   * @param {String} description - Item description
   */
  constructor (id, title, currency, amount, decimals, picture, condition, state, category, freeShipping = false, soldQuantity = 0, description = '') {
    this.id = id;
    this.title = title;
    this.price = new Price(currency, amount, decimals);
    this.picture = picture;
    this.condition = condition;
    this.state = state;
    this.category = category;
    this.freeShipping = freeShipping;
    this.soldQuantity = soldQuantity;
    this.description = description;
  }

  /**
   * Create a new Item from JSON
   * @param {JSON} json - Initial Object
   * @returns new Item
   */
  static fromJSON (json) {
    const amount = parseInt(json.price);
    const decimals = Utils.getDecimalsFromNumber(json.price);
    const item = new Item(json.id, json.title, json.currency_id, amount, decimals, json.thumbnail, json.condition, json.address?.state_name || '', json.category_id, json.shipping?.free_shipping || false, json.sold_quantity);
    return item;
  }

  /**
   * create a Summarized JSON from the object
   * @returns JSON Object
   */
  tosummarizedJSON () {
    return {
      id: this.id,
      title: this.title,
      price: this.price.toJSON(),
      picture: this.picture,
      condition: this.condition,
      free_shipping: this.freeShipping,
      state: this.state
    };
  }

  /**
   * Create a complete JSON from the object
   * @returns JSON Object
   */
  toCompleteJSON () {
    return {
      id: this.id,
      title: this.title,
      price: this.price.toJSON(),
      picture: this.picture,
      condition: this.condition,
      free_shipping: this.freeShipping,
      state: this.state,
      description: this.description,
      sold_quantity: this.soldQuantity
    };
  }
}

export default Item;
