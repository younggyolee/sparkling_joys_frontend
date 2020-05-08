import {
  loadingItems,
  SET_LOADING_ITEMS,
  ADD_LOADING_ITEM,
  REMOVE_LOADING_ITEM,
  loadingItem,
} from './types';

export const setLoadingItemsAction = (loadingItems: loadingItems) => ({
  type: SET_LOADING_ITEMS,
  loadingItems
});

export const addLoadingItemAction = (loadingItem: loadingItem) => ({
  type: ADD_LOADING_ITEM,
  loadingItem
});

export const removeLoadingItemAction = () => ({
  type: REMOVE_LOADING_ITEM,
});
