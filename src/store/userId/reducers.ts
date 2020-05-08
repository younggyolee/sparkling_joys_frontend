import { SET_USERID, setUserIdAction } from './types';

const initialState: string = '';

export const userIdReducer = (
  state = initialState,
  action: setUserIdAction
) => {
  switch (action.type) {
    case SET_USERID:
      return action.userId;
    default:
      return state;
  };
};
