import React, { Component } from 'react';
//import React-Router dependencies
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import store, { history } from './store';
//import Components
import App from './components/app';
import Main from './components/main';
import NewsFeed from './components/news_feed';
import Login from './components/login';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Login}></Route>
      <Route path="/user/:userID" component={App}>
        <IndexRoute component={NewsFeed}></IndexRoute>
      </Route>
    </Router>
  </Provider>
)

render(router, document.querySelector('.main-container'));
