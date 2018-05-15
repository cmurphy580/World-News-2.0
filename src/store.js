import { createStore, compose, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxPromise from 'redux-promise';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
//import { createHistory } from 'history';

import rootReducer from './reducers/index';

const store = createStore(rootReducer, applyMiddleware(ReduxPromise));

export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}


export default store;
