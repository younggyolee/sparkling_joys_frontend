import {
  SET_ALL_ITEMS,
  SET_OWNED_ITEMS,
  SET_WISHED_ITEMS,
  Items,
  setItemsActionTypes
} from './types';

const initialState: Items[] = [];

export const itemsReducer = (
  state = initialState,
  action: setItemsActionTypes
) => {
  switch (action.type) {
    case SET_ALL_ITEMS:
      return [...action.items];
    case SET_OWNED_ITEMS:
      const ownedItems = action.items.filter(item =>
        item.isOwned === true
      );
      return [...ownedItems];
    case SET_WISHED_ITEMS:
      const wishedItems = action.items.filter(item =>
        item.isOwned !== true
      );
      return [...wishedItems];
    default:
      return state;
  };
};
