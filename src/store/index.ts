import { createStore, combineReducers, applyMiddleware } from 'redux';
import { userIdReducer } from './userId/reducers';
import { itemsReducer } from './items/reducers';
import { loadingItemsReducer } from './loadingItems/reducers';
import { itemListViewReducer } from './itemListView/reducers';

const rootReducer = combineReducers({
  userId: userIdReducer,
  items: itemsReducer,
  loadingItems: loadingItemsReducer,
  itemListView: itemListViewReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [];

  if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);

    middlewares.push(logger);
  }

  const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares)
  );

  return store;
};
