import { createStore, combineReducers, applyMiddleware } from 'redux';
import { viewReducer } from './view/reducers';

const rootReducer = combineReducers({
  view: viewReducer
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
