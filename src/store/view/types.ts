export const VIEW_TYPES = {
  RECEPTION: 'reception',
  MAIN: 'main',
  QUEUE: 'queue',
  CHAT: 'chat'
};

export const SET_VIEW = 'SET_VIEW';

export interface SetViewAction {
  type: typeof SET_VIEW,
  view: string
}
