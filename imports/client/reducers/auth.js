import {assign} from 'lodash';
import {LOG_IN_USER, DATA_USER, LOGIN_SERVICE_CONFIGURED, LOG_OUT_USER, LOG_IN_ERROR} from '../actions/auth';

export const InitialState = {
  user: null,
  isLogIn: false,
  isServiceConfigured: false,
  erorMessage: ''
};

export default function(state = InitialState, action) {
  switch (action.type) {
    case DATA_USER:
      return assign({}, state, {
        user: action.data,
        isLogIn: action.data ? true : false,
        erorMessage: ''
      });
    case LOGIN_SERVICE_CONFIGURED:
      return assign({}, state, {
        isServiceConfigured: action.data
      });
    case LOG_IN_ERROR:
      return assign({}, state, {
        erorMessage: action.message
      });

    default:
      return state;
    }
}
