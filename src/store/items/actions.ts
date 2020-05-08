import { Items, SET_ITEMS } from './types';

export const setItemsAction = (items: Items) => ({
  type: SET_ITEMS,
  items
});
