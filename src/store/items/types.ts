export interface Item {
  id: string,
  title: string,
  price: number,
  priceCurrency: string,
  imageURL: string,
  isOwned: boolean
};

export interface Items extends Array<Item>{};

export const SET_ALL_ITEMS = 'SET_ALL_ITEMS';
export const SET_OWNED_ITEMS = 'SET_OWNED_ITEMS';
export const SET_WISHED_ITEMS = 'SET_WISHED_ITEMS';

export interface setAllItemsAction {
  type: typeof SET_ALL_ITEMS,
  items: Items;
};

export interface setOwnedItemsAction {
  type: typeof SET_OWNED_ITEMS,
  items: Items;
};

export interface setWishedItemsAction {
  type: typeof SET_WISHED_ITEMS,
  items: Items;
};

export type setItemsActionTypes = 
  setAllItemsAction |
  setOwnedItemsAction |
  setWishedItemsAction;
