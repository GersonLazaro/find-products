import ItemController from '../controllers/item';

export default (app) => {
  app.get('/api/items/:query', ItemController.getItem);
  app.get('/api/items', ItemController.getItemsByQuery);
};
