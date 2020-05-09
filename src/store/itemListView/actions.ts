import { SET_ITEM_LIST_VIEW } from './types';

export const setItemListViewAction = (view: string) => ({
  type: SET_ITEM_LIST_VIEW,
  view
});
