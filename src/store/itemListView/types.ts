export const SET_ITEM_LIST_VIEW = 'SET_ITEM_LIST_VIEW';

export const ITEM_LIST_VIEW_TYPES = {
  ALL: 'all',
  OWNED: 'owned',
  WISHED: 'wished'
};

// change name later, from ./store/userId to ./store/user
// change from string to object
export interface setItemListViewAction {
  type: typeof SET_ITEM_LIST_VIEW,
  view: string
};
