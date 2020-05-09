import { SET_USERNAME } from './types';

export const setUserNameAction = (userName: string) => ({
  type: SET_USERNAME,
  userName
});
