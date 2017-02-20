import {assign} from 'lodash';
import { FETCH_REPOSITORIES, PRE_FETCH_REPOSITORIES, LOG_OUT_USER } from '../actions/fetch_repositories';

const InitialState = {
	data: [],
	isPending: false,
	isError: false,
	isStart: false
};

export default function(state = InitialState, action) {
	switch (action.type) {
		case FETCH_REPOSITORIES:
			return assign({}, state, {
	        	data: action.payload || [],
	        	isPending: false,
	        	isError: action.isError,
	      	});

		case PRE_FETCH_REPOSITORIES:
			return assign({}, state, {
				data: [],
	        	isPending: action.isPending,
	        	isError: false,
	        	isStart: true
	      	});
	}

	return state;
};

