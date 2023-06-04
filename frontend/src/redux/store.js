import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { promiseMiddleware, localStorageMiddleware } from '../middleware';

import rootReducer from "./root-reducer";

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(promiseMiddleware, localStorageMiddleware);
  } else {
    // Enable additional logging in non-production environments.
    // return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware, createLogger())
    return applyMiddleware(logger, promiseMiddleware, localStorageMiddleware)
  }
};

// const middlewares = [logger, promiseMiddleware, localStorageMiddleware];
const store = createStore(rootReducer, getMiddleware());

export default store;