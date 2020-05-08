export interface Item {
  id: string,
  title: string,
  price: number,
  priceCurrency: string,
  imageURL: string,
  isOwned: boolean
};

export interface Items extends Array<Item>{};

export const SET_ITEMS = 'SET_ITEMS';

export interface setItemsAction {
  type: typeof SET_ITEMS,
  items: Items;
}
