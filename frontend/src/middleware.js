// import agent from './agent';
// import {
//   ASYNC_START,
//   ASYNC_END
// } from './constants/actionTypes';

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: "ASYNC_START", subtype: action.type });

    action.payload.then(
      res => {
        action.payload = res[0];
        store.dispatch({ type: "ASYNC_END", promise: action.payload });
        store.dispatch(action);
      },
      error => {
        action.error = true;
        action.payload = error.response ? error.response.body : '';
        if (!action.skipTracking) {
          store.dispatch({ type: "ASYNC_END", promise: action.payload });
        }
        store.dispatch(action);
      }
    );

    return;
  }

  next(action);
};

const localStorageMiddleware = store => next => action => {
  // if (action.type === REGISTER || action.type === LOGIN) {
  //   if (!action.error) {
  //     window.localStorage.setItem('jwt', action.payload.user.token);
  //     // agent.setToken(action.payload.user.token);
  //   }
  // } else if (action.type === LOGOUT) {
  //   window.localStorage.setItem('jwt', '');
  //   // agent.setToken(null);
  // }

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === 'function';
}


export { promiseMiddleware, localStorageMiddleware }