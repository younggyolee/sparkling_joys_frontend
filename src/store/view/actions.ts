import { SET_VIEW } from './types';

export const setView = (view: string) => ({
  type: SET_VIEW,
  view
});
