import { SET_USERNAME, setUserNameAction } from './types';

const initialState: string = '';

export const userNameReducer = (
  state = initialState,
  action: setUserNameAction
) => {
  switch (action.type) {
    case SET_USERNAME:
      return action.userName;
    default:
      return state;
  };
};
