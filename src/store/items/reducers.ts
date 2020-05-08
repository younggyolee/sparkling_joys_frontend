import { SET_ITEMS, setItemsAction, Items } from './types';

const initialState: Items[] = [];

export const itemsReducer = (
  state = initialState,
  action: setItemsAction
) => {
  switch (action.type) {
    case SET_ITEMS:
      return action.items;
    default:
      return state;
  };
};
