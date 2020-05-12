export const SET_USERNAME = 'SET_USERNAME';

// merge this with userId, into a single reducer
export interface setUserNameAction {
  type: typeof SET_USERNAME,
  userName: string
};
