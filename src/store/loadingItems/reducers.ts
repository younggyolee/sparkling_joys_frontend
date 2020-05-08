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
      return [action.loadingItem, ...state];
    case REMOVE_LOADING_ITEM:
      const stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy.pop();
      return [...stateCopy];
    default:
      return state;
  };
};
