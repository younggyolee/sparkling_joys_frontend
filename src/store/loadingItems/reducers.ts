import {
  SET_LOADING_ITEMS,
  ADD_LOADING_ITEM,
  REMOVE_LOADING_ITEM,
  LoadingItemActionTypes,
  loadingItems 
} from './types';

const initialState: loadingItems[] = [];

export const loadingItemsReducer = (
  state = initialState,
  action: LoadingItemActionTypes
) => {
  switch (action.type) {
    case SET_LOADING_ITEMS:
      return action.loadingItems;
    case ADD_LOADING_ITEM:
      return [...state, action.loadingItem];
    case REMOVE_LOADING_ITEM:
      const stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy.shift();
      return [...stateCopy];
    default:
      return state;
  };
};
