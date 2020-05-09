import {
  Items,
  SET_ALL_ITEMS,
  SET_OWNED_ITEMS,
  SET_WISHED_ITEMS
} from './types';

export const setAllItemsAction = (items: Items) => ({
  type: SET_ALL_ITEMS,
  items
});

export const setOwnedItemsAction = (items: Items) => ({
  type: SET_OWNED_ITEMS,
  items
});

export const setWishedItemsAction = (items: Items) => ({
  type: SET_WISHED_ITEMS,
  items
});


