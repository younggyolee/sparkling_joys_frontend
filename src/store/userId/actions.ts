import { SET_USERID } from './types';

export const setUserIdAction = (userId: string) => ({
  type: SET_USERID,
  userId
});
