import {
  SET_ITEM_LIST_VIEW,
  setItemListViewAction,
  ITEM_LIST_VIEW_TYPES
} from './types';

const initialState: string = ITEM_LIST_VIEW_TYPES.ALL;

export const itemListViewReducer = (
  state = initialState,
  action: setItemListViewAction
) => {
  switch (action.type) {
    case SET_ITEM_LIST_VIEW:
      return action.view;
    default:
      return state;
  };
};
