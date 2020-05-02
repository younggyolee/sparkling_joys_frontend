import { VIEW_TYPES, SET_VIEW, SetViewAction } from './types';

const initialState: string = VIEW_TYPES.MAIN;

export const viewReducer = (
  state = initialState,
  action: SetViewAction
) => {
  switch (action.type) {
    case SET_VIEW:
      return action.view;
    default:
      return state;
  };
};
