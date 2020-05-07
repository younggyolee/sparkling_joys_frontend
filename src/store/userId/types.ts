export const SET_USERID = 'SET_USERID';

// change name later, from ./store/userId to ./store/user
// change from string to object
export interface setUserIdAction {
  type: typeof SET_USERID,
  userId: string
};
