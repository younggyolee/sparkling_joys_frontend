export interface loadingItem {
  title: string,
  imageURL: string
};

export interface loadingItems extends Array<loadingItem>{};

export const SET_LOADING_ITEMS = 'SET_LOADING_ITEMS';
export const ADD_LOADING_ITEM = 'ADD_LOADING_ITEM';
export const REMOVE_LOADING_ITEM = 'REMOVE_LOADING_ITEM';

interface setLoadingItemsAction {
  type: typeof SET_LOADING_ITEMS,
  loadingItems: loadingItems;
};

interface addLoadingItemAction {
  type: typeof ADD_LOADING_ITEM,
  loadingItem: loadingItem
};

interface removeLoadingItemAction {
  type: typeof REMOVE_LOADING_ITEM
};

export type LoadingItemActionTypes = 
  setLoadingItemsAction |
  addLoadingItemAction |
  removeLoadingItemAction;
