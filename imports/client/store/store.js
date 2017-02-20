import { applyMiddleware, createStore, compose } from 'redux';
import createLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../../../imports/client/reducers/index';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

const logger = createLogger({
	level: 'info',
	collapsed: true,
});

const middlewareRouter = routerMiddleware(browserHistory);

const enhancers = [
	applyMiddleware(ReduxThunk, middlewareRouter, logger)
];

const Store = createStore(rootReducer, {}, compose(...enhancers));

export default Store;
