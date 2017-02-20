import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import repositoriesReducer from './reducer_repositories';
import auth from './auth';
import modal from './modal';

const rootReducer = combineReducers({
	auth: auth,
	repositories: repositoriesReducer,
	routing: routerReducer,
	modal: modal
});

export default rootReducer;
