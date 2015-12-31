import thunk from 'redux-thunk';
import rootReducer from './modules';
import {
  applyMiddleware,
  compose,
  createStore

}from 'redux';

export default function configureStore (initialState) {
  let createStoreWithMiddleware;

  const middleware = applyMiddleware(thunk);

  createStoreWithMiddleware = compose(middleware);

  const store = createStoreWithMiddleware(createStore)(
    rootReducer, initialState
  );
  if (module.hot) {
    module.hot.accept('./modules', () => {
      const nextRootReducer = require('./modules');

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
