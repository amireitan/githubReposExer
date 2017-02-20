import React, { Component } from 'react';
import ReactDOM  from 'react-dom';
import { Provider } from 'react-redux';
import {loadUser} from '../../imports/client/actions/auth';
import store from '../../imports/client/store/store';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import App from '../../imports/client/components/app';

function AppRoot() {
  const history = syncHistoryWithStore(browserHistory, store);

  return (
    <div className='app-container'>
      <Provider store={store}>
        <Router history={history} >
            <Route path="/" component={App} ></Route>
        </Router>
      </Provider>
    </div>
  );
}


Meteor.startup(()=> {
  ReactDOM.render(
    <AppRoot />,
    document.getElementById('app')
  );

  store.dispatch(loadUser());
});
