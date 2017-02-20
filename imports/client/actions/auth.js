import { Tracker } from 'meteor/tracker'

//export consts varaiables - action types
export const LOG_OUT_USER = 'LOG_IN_USER';
export const LOG_IN_USER = 'LOG_IN_USER';
export const DATA_USER = 'DATA_USER';
export const LOG_IN_ERROR = 'LOG_IN_ERROR';
export const LOGIN_SERVICE_CONFIGURED = 'LOGIN_SERVICE_CONFIGURED';


//Action creator - runs first on app load
export function loadUser() {
  
  return dispatch => {
    Tracker.autorun(() => {
      dispatch({
        type: 'LOGIN_SERVICE_CONFIGURED',
        data: Accounts.loginServicesConfigured()
      });
    });

    Tracker.autorun(() => {
      dispatch({
        type: 'LOG_IN_USER',
        data: Meteor.loggingIn()
      });
    });

    Tracker.autorun(() => {
      dispatch({
        type: 'DATA_USER',
        data: Meteor.user()
      });
    });
  };
}



