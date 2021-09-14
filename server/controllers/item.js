import ItemModel from '../models/item';
import Utils from '../utils/utils';
import CONSTANTS from '../constants/constants';
/**
 * Item Controller
 */
export default class ItemController {
  /**
   * Handler for getItem requests
   * @param {Request} req - Request
   * @param {Response} res - Response
   * @param {Function} next - Next
   */
  static async getItem (req, res, next) {
    try {
      const query = req.params.query;
      const data = await Utils.getData(`${CONSTANTS.API_CONFIG.API_URL + CONSTANTS.API_CONFIG.API_ENDPOINT_ITEMS}/${query}`);
      const item = ItemModel.fromJSON(data);
      const description = await Utils.getData(`${CONSTANTS.API_CONFIG.API_URL + CONSTANTS.API_CONFIG.API_ENDPOINT_ITEMS}/${query}${CONSTANTS.API_CONFIG.API_ENDPOINT_DESCRIPTION}`);
      item.description = description.plain_text;
      const categoryPath = await ItemController.getCategoryPath(item.category);
      const answer = ItemController.makeItemJSON(item, categoryPath);
      res.json(answer);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  /**
   * Handler for getItemsByQuery
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   */
  static async getItemsByQuery (req, res, next) {
    try {
      const query = req.query.q;
      const data = await Utils.getData(`${CONSTANTS.API_CONFIG.API_URL + CONSTANTS.API_CONFIG.API_ENDPOINT_SITES}?q=${query}&limit=4`);
      const items = ItemController.getItemsFromData(data.results, false);
      const formattedItems = ItemController.getItemsFromData(data.results, true);
      const categoryId = ItemController.getCategoryId(items);
      const categoryPath = await ItemController.getCategoryPath(categoryId);
      const answer = ItemController.makeListJSON(formattedItems, categoryPath);
      res.json(answer);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  /**
   * Get the path of categories in the breadcrumb
   * @param {String} id - Number
   * @returns list of categories
   */
  static async getCategoryPath (id) {
    try {
      const data = await Utils.getData(`${CONSTANTS.API_CONFIG.API_URL + CONSTANTS.API_CONFIG.API_ENDPOINT_CATEGORIES}/${id}`);
      const categories = data.path_from_root.map((step) => {
        return step.name;
      });
      return categories;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Create a list of Items and encapsulate it in a JSON object
   * @param {Array} items
   * @param {Array} categoryPath
   * @returns JSON Object
   */
  static makeListJSON (items, categoryPath) {
    return {
      author: {
        name: CONSTANTS.SIGNATURE.NAME,
        lastname: CONSTANTS.SIGNATURE.LASTNAME
      },
      categories: categoryPath,
      items: items
    };
  }

  /**
   * Create a object JSON with an Item
   * @param {Item} item
   * @param {Array} categoryPath
   * @returns JSON Object
   */
  static makeItemJSON (item, categoryPath) {
    item = item.toCompleteJSON();
    item.category_path = categoryPath;
    return {
      author: {
        name: CONSTANTS.SIGNATURE.NAME,
        lastname: CONSTANTS.SIGNATURE.LASTNAME
      },
      item: item
    };
  }

  /**
   * Get the most repeated category in a set of items
   * @param {Array} items
   * @returns Most repeated category ID.
   */
  static getCategoryId (items) {
    const categories = new Map();
    items.forEach((item) => {
      const value = categories.get(item.category);
      if (value) {
        categories.set(item.category, value + 1);
      } else {
        categories.set(item.category, 1);
      }
    });
    const mainCategory = {
      name: '',
      quantity: 0
    };
    categories.forEach((quantity, category) => {
      if (quantity > mainCategory.quantity) {
        mainCategory.name = category;
        mainCategory.quantity = quantity;
      }
    });
    return mainCategory.name;
  }

  /**
   * Format a set of inputs acoording to standard
   * @param {Array} data - Array of Items
   * @param {bool} jsonFormat - Return the object in JSON if this param is true.
   * @returns Formatted output
   */
  static getItemsFromData (data, jsonFormat) {
    return data?.map((result) => {
      if (jsonFormat) return ItemModel.fromJSON(result).tosummarizedJSON();
      else return ItemModel.fromJSON(result);
    });
  }
}
